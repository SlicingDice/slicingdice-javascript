/*
Tests SlicingDice endpoints.

This script tests SlicingDice by running tests suites, each composed by:
    - Creating columns
    - Inserting data
    - Querying
    - Comparing results

All tests are stored in JSON files at ./examples named as the query being
tested:
    - count_entity.json
    - count_event.json

In order to execute the tests, simply replace API_KEY by the demo API key and
run the script with:
    $ node run_tests.js
*/

"use strict";

var SlicingDice = require('../src/slicer.js');
var errors = require('../src/errors.js');
var fs = require('fs');
var async = require('async');
var https = require('https');
var sleep = require('sleep');

var HAS_FAILED_TESTS = false;

var perTestInsertion;

class SlicingDiceTester {
    constructor(api_key, verbose=false) {
        this.client = new SlicingDice({masterKey: api_key});

        // Translation table for columns with timestamp
        this.columnTranslation = {}

        // Sleep Time in seconds
        this.sleepTime = 5;
        // Directory containing examples to test
        this.path = 'examples/';
        // Examples file format
        this.extension = '.json';

        this.numSuccesses = 0;
        this.numFails = 0;
        this.failedTests = [];

        this.verbose = verbose;

        this.perTestInsertion;

        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                ;
            });
        };
    }

    /* Run all tests for a determined query type
     * 
     * @param (string) queryType - the type of the query to test
     */
    runTests(queryType, callback) {
        let testData = this.loadTestData(queryType);
        let numTests = testData.length;
        let result;

        this.perTestInsertion = testData[0].hasOwnProperty("insert");

        if (!this.perTestInsertion) {
            let insertData = this.loadTestData(queryType, "_insert");
            for (let i = 0; i < insertData.length; i++) {
                async.series([
                    (callback) => {
                        this.client.insert(insertData[i], false).then(() => {
                            // Wait a few seconds so the data can be inserted by SlicingDice
                            callback();
                        }, (err) => {
                            callback();
                        });
                    }
                ]);
            }
            sleep.sleep(this.sleepTime);
        }

        let tasks = [];
        for(let i = 0; i < numTests; i++){
            tasks.push(((i) => (callback) => {
                try {
                    let test = testData[i];
                    this._emptyColumnTranslation();
                    console.log("({0}/{1}) Executing test \"{2}\"".format(i + 1, numTests, test['name']));
                    if("description" in test){
                        console.log("  Description: {0}".format(test['description']));
                    }

                    console.log("  Query type: {0}".format(queryType));

                    if (this.perTestInsertion) {
                        async.series([
                            (callback) => {
                                this.createColumns(test, callback);
                            },
                            (callback) => {
                                this.insertData(test, callback);
                            },
                            (callback) => {
                                this.executeQuery(queryType, test, callback);
                            }
                        ], callback);
                    } else {
                        async.series([
                            (callback) => {
                                this.executeQuery(queryType, test, callback);
                            }
                        ], callback);
                    }
                } catch (err) {
                    callback();
                }
            })(i));
        }
        async.series(tasks, callback);
    }

    // Erase columnTranslation object
    _emptyColumnTranslation(){
        this.columnTranslation = {};
    }

    // Load test data from examples files
    loadTestData(queryType, suffix = "") {
        let filename = this.path + queryType + suffix + this.extension;
        return JSON.parse(fs.readFileSync(filename));
    }

    /* Create columns on Slicing Dice API
     * 
     * @param (array) test - the test data containing the column to create
     */
    createColumns(test, callback){
        let isSingular = test['columns'].length == 1;
        let column_or_columns;
        if (isSingular){
            column_or_columns = 'column';
        } else{
            column_or_columns = 'columns';
        }
        console.log("  Creating {0} {1}".format(test['columns'].length, column_or_columns));

        let tasks = [];
        for(var data in test['columns']) {
            let column = test['columns'][data];
            this._appendTimestampToColumnName(column);
            tasks.push((callback) => {
                this.client.createColumn(column).then((resp) => {
                    callback();
                }, (err) => {
                    this.compareResult(test, err);
                    callback();
                });
            });
            if (this.verbose){
                console.log("    - {0}".format(column['api-name']));
            }
        }

        async.series(tasks, callback);
    }

    /* Append integer timestamp to column name
     * 
     * This technique allows the same test suite to be executed over and over
     * again, since each execution will use different column names.
     *
     * @param (array) column - array containing column name
     */
    _appendTimestampToColumnName(column){
        let oldName = '"{0}'.format(column['api-name']);

        let timestamp = this._getTimestamp();
        column['name'] += timestamp
        column['api-name'] += timestamp
        let newName = '"{0}'.format(column['api-name'])

        this.columnTranslation[oldName] = newName
    }

    // Get actual timestamp in string format
    _getTimestamp(){
        return new Date().getTime().toString();
    }

    /* Insert data on Slicing Dice API
     * 
     * @param (array) test - the test data containing the data to insert on Slicing Dice API
     */
    insertData(test, callback) {
        let isSingular = test['insert'].length == 1;
        let column_or_columns;
        if (isSingular){
            column_or_columns = 'entity';
        } else{
            column_or_columns = 'entities';
        }
        console.log("  Inserting {0} {1}".format(Object.keys(test['insert']).length, column_or_columns));

        let insertData = this._translateColumnNames(test['insert']);

        if (this.verbose){
            console.log(insertData);
        }

        this.client.insert(insertData, false).then(() => {
            // Wait a few seconds so the data can be inserted by SlicingDice
            sleep.sleep(this.sleepTime);
            callback();
        }, (err) => {
            this.compareResult(test, err);
            callback();
        });
    }

    /* Execute query on Slicing Dice API
     * 
     * @param (string) queryType - the type of the query to send
     * @param (string) test - the test data containing the data to query on Slicing Dice API
     */
    executeQuery(queryType, test, callback) {
        let result;
        let queryData;
        if (this.perTestInsertion) {
            queryData = this._translateColumnNames(test['query']);
        } else {
            queryData = test['query'];
        }
        console.log('  Querying');

        if (this.verbose){
            console.log('    - ' + JSON.stringify(queryData));
        }

        var queryTypeMethodMap = {
            'count_entity': 'countEntity',
            'count_event': 'countEvent',
            'top_values': 'topValues',
            'aggregation': 'aggregation',
            'result': 'result',
            'score': 'score',
            'sql': 'sql'
        };

        this.client[queryTypeMethodMap[queryType]](queryData).then((resp) =>{
            this.compareResult(test, resp);
            callback();
        }, (err) =>{
            this.compareResult(test, err);
            callback(err);
        })
    }

    /* Translate column name to match column name with timestamp
     * 
     * @param (array) jsonData - the json to translate the column name
     */
    _translateColumnNames(jsonData){
        let dataString = JSON.stringify(jsonData);
        for(var oldName in this.columnTranslation){
            let newName = this.columnTranslation[oldName];
            dataString = dataString.replaceAll(oldName, newName);
        }
        return JSON.parse(dataString);
    }

    /* Compare the result received from Slicing Dice API and the expected
     * 
     * @param (array) test - the data expected 
     * @param (array) result - the data received from Slicing Dice API
     */
    compareResult(test, result) {
        let expected;
        if (this.perTestInsertion) {
            expected = this._translateColumnNames(test['expected']);
        } else {
            expected = test['expected'];
        }
        
        let dataExpected = test['expected'];

        for(var key in dataExpected) {
            let value = dataExpected[key];
            if (value === 'ignore') {
                continue;
            }

            if (!this.compareJson(expected[key], result[key])){
                this.numFails += 1;
                this.failedTests.push(test['name']);

                console.log("  Expected: \"{0}\": {1}".format(key, JSON.stringify(expected[key])));
                console.log("  Result:   \"{0}\": {1}".format(key, JSON.stringify(result[key])));
                console.log("  Status: Failed\n");
                this.updateResult();
                return;
            }

            this.numSuccesses += 1;

            console.log('  Status: Passed\n');
            this.updateResult();
        }
    }

    /* Compare two JSON's 
     * 
     * @param (object) expected - the data expected 
     * @param (object) result - the data received from Slicing Dice API
     */
    compareJson(expected, result) {
        if (typeof expected !== typeof result) return false;
        if (expected.constructor !== result.constructor) return false;

        if (expected instanceof Array) {
            return this.arrayEqual(expected, result);
        }

        if(typeof expected === "object") {
            return this.compareJsonValue(expected, result);
        }

        return expected === result;
    }

    /* Compare two JSON's values
     * 
     * @param (object) expected - the data expected 
     * @param (object) result - the data received from Slicing Dice API
     */
    compareJsonValue(expected, result) {
        for (let key in expected) {
             if (expected.hasOwnProperty(key)) {
                 if (!result.hasOwnProperty(key)) {
                     return false;
                 }

                 if (!this.compareJson(expected[key], result[key])) {
                     return false;
                 }
             }
        }

        return true;
    }

    /* Compare two JSON's arrays
     * 
     * @param (array) expected - the data expected 
     * @param (array) result - the data received from Slicing Dice API
     */
    arrayEqual(expected, result) {
        if (expected.length !== result.length) {
            return false;
        }

        let i = expected.length;

        while (i--) {
            let j = result.length;
            let found = false;

            while (!found && j--) {
                if (this.compareJson(expected[i], result[j])) {
                    found = true;
                }
            }

            if (!found) {
                return false;
            }
        }

        return true;
    }

    // Write a file testResult.tmp with the result of the tests
    updateResult() {
        if (process.platform == "win32") {
            return;
        }
        let finalMessage;
        let failedTestsStr = "";

        if (this.failedTests.length > 0){
            for(let item in this.failedTests) {
                failedTestsStr += "    - {0}\n".format(this.failedTests[item]);
            }
        }
        if (this.numFails > 0){
            HAS_FAILED_TESTS = true;
            let isSingular = this.numFails == 1;
            let testOrTests = null;
            if (isSingular){
                testOrTests = "test has";
            } else {
                testOrTests = "tests have";
            }

            finalMessage = "FAIL: {0} {1} failed\n".format(this.numFails, testOrTests);
        } else {
            finalMessage = "SUCCESS: All tests passed\n";
        }

        let content = "\nResults:\n  Successes: {0}\n  Fails: {1} \n{2}\n{3}".format(this.numSuccesses, this.numFails, failedTestsStr, finalMessage);

        fs.writeFile('testResult.tmp', content, function (err) {
            if (err) return console.log(err);
        });
    }
}

// Show results of the test saved on testResult.tmp file
function showResults(){
    console.log(fs.readFileSync('testResult.tmp', 'utf8'));
    fs.unlink('testResult.tmp', (err) => {
        if (err) throw err;
    });

    if (HAS_FAILED_TESTS)
        process.exit(1);
    process.exit(0);
}
process.on('SIGINT', function() {
    showResults();
});

function main(){
    // SlicingDice queries to be tested. Must match the JSON file name.
    let queryTypes = [
        'count_entity', 
        'count_event', 
        'top_values',
        'aggregation',
        'result',
        'score',
        'sql'
        ];

    // Testing class with demo API key
    // To get a demo api key visit: http://panel.slicingdice.com/docs/#api-details-api-connection-api-keys-demo-key
    let sdTester = new SlicingDiceTester(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfX3NhbHQiOiIxNTE4NjA3ODQ0NDAzIiwicGVybWlzc2lvbl9sZXZlbCI6MywicHJvamVjdF9pZCI6NDY5NjYsImNsaWVudF9pZCI6OTUxfQ.S6LCWQDcLS1DEFy3lsqk2jTGIe5rJ5fsQIvWuuFBdkw', false);

    let tests = [];
    for(let i = 0; i < queryTypes.length; i++) {
        tests.push((callback) => sdTester.runTests(queryTypes[i], callback));
    }

    async.series(tests, () => {
        showResults();
    });
}

if (require.main === module) {
    main();
}
