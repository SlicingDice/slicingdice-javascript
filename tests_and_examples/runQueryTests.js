/*
Tests SlicingDice endpoints.

This script tests SlicingDice by running tests suites, each composed by:
    - Creating fields
    - Indexing data
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

class SlicingDiceTester {
    constructor(api_key, verbose=false) {
        this.client = new SlicingDice({
            masterKey: api_key
        }, true);

        // Translation table for fields with timestamp
        this.fieldTranslation = {}

        // Sleep Time in seconds
        this.sleepTime = 10;
        // Directory containing examples to test
        this.path = 'examples/';
        // Examples file format
        this.extension = '.json';

        this.numSuccesses = 0;
        this.numFails = 0;
        this.failedTests = [];

        this.verbose = verbose;

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

        let tasks = [];
        for(let i = 0; i < numTests; i++){
            tasks.push(((i) => (callback) => {
                try {
                    let test = testData[i];
                    this._emptyFieldTranslation();
                    console.log("({0}/{1}) Executing test \"{2}\"".format(i + 1, numTests, test['name']));
                    if("description" in test){
                        console.log("  Description: {0}".format(test['description']));
                    }

                    console.log("  Query type: {0}".format(queryType));
                    async.series([
                        (callback) => {
                            this.createFields(test, callback);
                        },
                        (callback) => {
                            this.indexData(test, callback);
                        },
                        (callback) => {
                            this.executeQuery(queryType, test, callback);
                        }
                    ], callback);
                } catch (err) {
                    callback();
                }
            })(i));
        }
        async.series(tasks, callback);
    }

    // Erase fieldTranslation object
    _emptyFieldTranslation(){
        this.fieldTranslation = {};
    }

    // Load test data from examples files
    loadTestData(queryType) {
        let filename = this.path + queryType + this.extension;
        return JSON.parse(fs.readFileSync(filename));
    }

    /* Create fields on Slicing Dice API
     * 
     * @param (array) test - the test data containing the field to create
     */
    createFields(test, callback){
        let isSingular = test['fields'].length == 1;
        let field_or_fields;
        if (isSingular){
            field_or_fields = 'field';
        } else{
            field_or_fields = 'fields';
        }
        console.log("  Creating {0} {1}".format(test['fields'].length, field_or_fields));

        let tasks = [];
        for(var data in test['fields']) {
            let field = test['fields'][data];
            this._appendTimestampToFieldName(field);
            tasks.push((callback) => {
                this.client.createField(field).then((resp) => {
                    callback();
                }, (err) => {
                    this.compareResult(test, err);
                    callback();
                });
            });
            if (this.verbose){
                console.log("    - {0}".format(field['api-name']));
            }
        }

        async.series(tasks, callback);
    }

    /* Append integer timestamp to field name
     * 
     * This technique allows the same test suite to be executed over and over
     * again, since each execution will use different field names.
     *
     * @param (array) field - array containing field name
     */
    _appendTimestampToFieldName(field){
        let oldName = '"{0}"'.format(field['api-name']);

        let timestamp = this._getTimestamp();
        field['name'] += timestamp
        field['api-name'] += timestamp
        let newName = '"{0}"'.format(field['api-name'])

        this.fieldTranslation[oldName] = newName
    }

    // Get actual timestamp in string format
    _getTimestamp(){
        return new Date().getTime().toString();
    }

    /* Index data on Slicing Dice API
     * 
     * @param (array) test - the test data containing the data to index on Slicing Dice API
     */
    indexData(test, callback) {
        let isSingular = test['index'].length == 1;
        let field_or_fields;
        if (isSingular){
            field_or_fields = 'entity';
        } else{
            field_or_fields = 'entities';
        }
        console.log("  Indexing {0} {1}".format(Object.keys(test['index']).length, field_or_fields));

        let indexData = this._translateFieldNames(test['index']);

        if (this.verbose){
            console.log(indexData);
        }

        this.client.index(indexData, false).then(() => {
            // Wait a few seconds so the data can be indexed by SlicingDice
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
        let queryData = this._translateFieldNames(test['query']);
        console.log('  Querying');

        if (this.verbose){
            console.log('    - {}'.format(query_data));
        }

        var queryTypeMethodMap = {
            'count_entity': 'countEntity',
            'count_event': 'countEvent',
            'top_values': 'topValues',
            'aggregation': 'aggregation',
            'result': 'result',
            'score': 'score'
        };

        this.client[queryTypeMethodMap[queryType]](queryData).then((resp) =>{
            this.compareResult(test, resp);
            callback();
        }, (err) =>{
            this.compareResult(test, err);
            callback(err);
        })
    }

    /* Translate field name to match field name with timestamp
     * 
     * @param (array) jsonData - the json to translate the field name
     */
    _translateFieldNames(jsonData){
        let dataString = JSON.stringify(jsonData);
        for(var oldName in this.fieldTranslation){
            let newName = this.fieldTranslation[oldName];
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
        let expected = this._translateFieldNames(test['expected']);
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
            return this.compareJsonValue(expected, result);
        }

        if(typeof expected === "object") {
            return this.arrayEqual(expected, result);
        }

        return expected === result;
    }

    /* Compare two JSON's values
     * 
     * @param (object) expected - the data expected 
     * @param (object) result - the data received from Slicing Dice API
     */
    compareJsonValue(expected, result) {
        for (var key in expected) {
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

        var i = expected.length;

        while (i--) {
            var j = result.length;
            var found = false;

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
            for(var item in this.failedTests) {
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
    let queryTypes = ['count_entity', 'count_event', 'top_values', 'aggregation', 'result', 'score'];

    // Testing class with demo API key
    // To get a demo api key visit: http://panel.slicingdice.com/docs/#api-details-api-connection-api-keys-demo-key
    let sdTester = new SlicingDiceTester(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfX3NhbHQiOiJkZW1vNDJtIiwicGVybWlzc2lvbl9sZXZlbCI6MywicHJvamVjdF9pZCI6MjAzLCJjbGllbnRfaWQiOjEwfQ.G537mbBeMOQ673wcp_Yu0ypsAmqYfvFEvqdemmVrATI',
        false);

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
