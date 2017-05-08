# Tests and Examples

In this directory, you find unitary and regression tests for SlicingDice client. These tests are self-contained and have two purposes:

1. Present examples of column creation, data insertion, and queries, as well as expected query results
2. Provide regression tests that can be executed by anyone with one simple command

## Data
The `examples/` directory contains one file for each [SlicingDice query](http://panel.slicingdice.com/docs/#data-querying) in JSON format.

Each JSON file contains a list of examples, such as the following excerpt, with the following elements:

* `name`: Test name, as it will be printed on screen.
* `columns`: [Columns](http://panel.slicingdice.com/docs/#data-modeling-columns) that will be created for this test.
* `insert`: Data that will be [inserted](http://panel.slicingdice.com/docs/#data-insertion) in this test.
* `query`: [Query](http://panel.slicingdice.com/docs/#data-querying) that will extract some information for the inserted data.
* `expected`: Expected result message after SlicingDice executes the query. Values marked as `"ignore"` won't be taken into account to determine whether the test has passed or failed.

```json
[
    {
        "name": "Test for a \"COUNT ENTITY\" query using column \"STRING\" and parameter \"EQUALS\".",
        "description": "Optional description about the test",
        "columns": [
            {
                "name": "string_test_column",
                "api-name": "string-test-column",
                "type": "string",
                "cardinality": "high",
                "storage": "latest-value"
            }
        ],
        "insert": {
            "24": {
                "string-test-column": "value:matched_value"
            }
        },
        "query": {
            "query-name": "test_result_query",
            "query": [
                {
                    "string-test-column": {
                        "equals": "value:matched_value"
                    }
                }
            ]
        },
        "expected": {
            "status": "ignore",
            "result": {
                "test_result_query": 1
            },
            "took": "ignore"
        }
    },
    {
        "name": "Test for a \"COUNT ENTITY\" query using column \"INTEGER\" and parameter \"EQUALS\".",
        "description": "Optional description about the test",
        "columns": [
            {
                "name": "integer_test_column",
                "api-name": "integer-test-column",
                "type": "integer",
                "storage": "latest-value"
            }
        ],
        "insert": {
            "1": {
                "integer-test-column": 1000001
            },
            "2": {
                "integer-test-column": 1234567
            },
            "3": {
                "integer-test-column": 1000001
            }
        },
        "query": {
            "query-name": "test_result_query",
            "query": [
                {
                    "integer-test-column": {
                        "equals": 1000001
                    }
                }
            ]
        },
        "expected": {
            "status": "ignore",
            "result": {
                "test_result_query": 2
            },
            "took": "ignore"
        }
    }
]
```

## Executing

In order to run all tests stored at `examples/`, simply run the `run_query_tests.js` script:

```bash
$ node run_query_tests.js
```

## Output

The test script will execute one test at a time, printing results such as the following:

```
(1/2) Executing test "Test for a "COUNT ENTITY" query using column "STRING" and parameter "EQUALS"."
  Query type: count_entity
  Creating 1 column
  Inserting 1 entity
  Querying
  Status: Passed

(2/2) Executing test "Test for a "COUNT ENTITY" query using column "INTEGER" and parameter "EQUALS"."
  Query type: count_entity
  Creating 1 column
  Inserting 3 entities
  Querying
  Status: Passed

Results:
  Successes: 2
  Fails: 0

SUCCESS: All tests passed
```

In case a test fails, the script will output the expected and actual result messages, continue executing other tests and, at the end, consolidate all failed tests.

```
(1/2) Executing test "Test for a "COUNT ENTITY" query using column "STRING" and parameter "EQUALS"."
  Query type: count_entity
  Creating 1 column
  Inserting 1 entity
  Querying
  Expected: "result": {u'test_result_query': 1}
  Result:   "result": {u'test_result_query': 0}
  Status: Failed

(2/2) Executing test "Test for a "COUNT ENTITY" query using column "INTEGER" and parameter "EQUALS"."
  Query type: count_entity
  Creating 1 column
  Inserting 3 entities
  Querying
  Status: Passed

Results:
  Successes: 1
  Fails: 1
    - Test for a "COUNT ENTITY" query using column "STRING" and parameter "EQUALS".

FAIL: 1 test has failed
```
