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
        });

        // Translation table for fields with timestamp
        this.fieldTranslation = {}

        this.sleepTime = 5;  // seconds
        this.path = 'examples/';  // Directory containing examples to test
        this.extension = '.json';  // Examples file format

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

    _emptyFieldTranslation(){
        this.fieldTranslation = {};
    }

    loadTestData(queryType){
        let filename = this.path + queryType + this.extension;
        return JSON.parse(fs.readFileSync(filename));
    }

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
                this.client.createField(field, true).then((resp) => {
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

    _appendTimestampToFieldName(field){
        let oldName = '"{0}"'.format(field['api-name']);

        let timestamp = this._getTimestamp();
        field['name'] += timestamp
        field['api-name'] += timestamp
        let newName = '"{0}"'.format(field['api-name'])

        this.fieldTranslation[oldName] = newName
    }

    _getTimestamp(){
        return new Date().getTime().toString();
    }

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

        this.client.index(indexData, false, true).then(() => {
            // Wait a few seconds so the data can be indexed by SlicingDice
            sleep.sleep(this.sleepTime);
            callback();
        }, (err) => {
            this.compareResult(test, err);
            callback();
        });
    }

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
            'aggregation': 'aggregation'
        };

        this.client[queryTypeMethodMap[queryType]](queryData, true).then((resp) =>{
            this.compareResult(test, resp);
            callback();
        }, (err) =>{
            this.compareResult(test, err);
            callback(err);
        })
    }

    _translateFieldNames(jsonData){
        let dataString = JSON.stringify(jsonData);
        for(var oldName in this.fieldTranslation){
            let newName = this.fieldTranslation[oldName];
            dataString = dataString.replaceAll(oldName, newName);
        }
        return JSON.parse(dataString);
    }

    compareResult(test, result){
        let expected = this._translateFieldNames(test['expected']);
        let dataExpected = test['expected'];

        for(var key in dataExpected) {
            let value = dataExpected[key];
            if (value === 'ignore') {
                continue;
            }

            if (JSON.stringify(expected[key]) != JSON.stringify(result[key])){
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
    let queryTypes = ['count_entity', 'count_event', 'top_values', 'aggregation'];

    // Testing class with demo API key
    // http://panel.slicingdice.com/docs/#api-details-api-connection-api-keys-demo-key
    let sdTester = new SlicingDiceTester(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfX3NhbHQiOiJkZW1vMW0iLCJwZXJtaXNzaW9uX2xldmVsIjozLCJwcm9qZWN0X2lkIjoyMCwiY2xpZW50X2lkIjoxMH0.xRBHeDxTzYAgFyuU94SWFbjITeoxgyRCQGdIee8qrLA',
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
