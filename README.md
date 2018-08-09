# SlicingDice Official JavaScript Client (v2.1.0)

Official JavaScript client for [SlicingDice - Data Warehouse and Analytics Database as a Service](https://www.slicingdice.com/).

[SlicingDice](http://www.slicingdice.com/) is a serverless, SQL & API-based, easy-to-use and really cost-effective alternative to Amazon Redshift and Google BigQuery.

### Build Status: [![CircleCI](https://circleci.com/gh/SlicingDice/slicingdice-javascript/tree/master.svg?style=svg)](https://circleci.com/gh/SlicingDice/slicingdice-javascript/tree/master)

### Code Quality: [![Codacy Badge](https://api.codacy.com/project/badge/Grade/67f731bdb3cb4eb08624240d17280a26)](https://www.codacy.com/app/SimbioseVentures/slicingdice-javascript?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SlicingDice/slicingdice-javascript&amp;utm_campaign=Badge_Grade)

## Documentation

If you are new to SlicingDice, check our [quickstart guide](https://docs.slicingdice.com/docs/quickstart-guide) and learn to use it in 15 minutes.

Please refer to the [SlicingDice official documentation](https://docs.slicingdice.com/) for more information on [how to create a database](https://docs.slicingdice.com/docs/how-to-create-a-database), [how to insert data](https://docs.slicingdice.com/docs/how-to-insert-data), [how to make queries](https://docs.slicingdice.com/docs/how-to-make-queries), [how to create columns](https://docs.slicingdice.com/docs/how-to-create-columns), [SlicingDice restrictions](https://docs.slicingdice.com/docs/current-restrictions) and [API details](https://docs.slicingdice.com/docs/api-details).

## Tests and Examples

Whether you want to test the client installation or simply check more examples on how the client works, take a look at [tests and examples directory](tests_and_examples/).

## Installing

In order to install the JavaScript client, you only need to use [`npm`](https://www.npmjs.com/).

```bash
npm install slicerjs
```

## Usage

The following code snippet is an example of how to add and query data
using the SlicingDice javascript client. We entry data informing
`user1@slicingdice.com` has age 22 and then query the database for
the number of users with age between 20 and 40 years old.
If this is the first register ever entered into the system,
 the answer should be 1.

```javascript
var SlicingDice = require('slicerjs'); // only required for Node.js

// Configure the client
const client = new SlicingDice({
  masterKey: 'MASTER_API_KEY',
  writeKey: 'WRITE_API_KEY',
  readKey: 'READ_API_KEY'
});

// Inserting data
const insertData = {
    "user1@slicingdice.com": {
        "age": 22
    },
    "auto-create": ["dimension", "column"]
};
client.insert(insertData);

// Querying data
const queryData = {
    "query-name": "users-between-20-and-40",
    "query": [
        {
            "age": {
                "range": [
                    20,
                    40
                ]
            }
        }
    ]
};
client.countEntity(queryData).then((resp) => {
    console.log(resp);
}, (err) => {
    console.err(err);
});
```

## Reference

`SlicingDice` encapsulates logic for sending requests to the API. Its methods are thin layers around the [API endpoints](https://docs.slicingdice.com/docs/api-details), so their parameters and return values are JSON-like `Object` objects with the same syntax as the [API endpoints](https://docs.slicingdice.com/docs/api-details)

### Constructor

`SlicingDice(apiKeys)`
* `apiKeys (Object)` - [API key](https://docs.slicingdice.com/docs/api-keys) to authenticate requests with the SlicingDice API.

### `getDatabase()`
Get information about current database. This method corresponds to a `GET` request at `/database`.

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
  masterKey: 'MASTER_API_KEY'
});

client.getDatabase().then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
    "name": "Database 1",
    "description": "My first database",
    "dimensions": [
    	"default",
        "users"
    ],
    "updated-at": "2017-05-19T14:27:47.417415",
    "created-at": "2017-05-12T02:23:34.231418"
}
```

### `getColumns()`
Get all created columns, both active and inactive ones. This method corresponds to a [GET request at /column](https://docs.slicingdice.com/docs/how-to-list-edit-or-delete-columns).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_API_KEY'
});

client.getColumns().then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
    "active": [
        {
          "name": "Model",
          "api-name": "car-model",
          "description": "Car models from dealerships",
          "type": "string",
          "category": "general",
          "cardinality": "high",
          "storage": "latest-value"
        }
    ],
    "inactive": [
        {
          "name": "Year",
          "api-name": "car-year",
          "description": "Year of manufacture",
          "type": "integer",
          "category": "general",
          "storage": "latest-value"
        }
    ]
}
```

### `createColumn(jsonData)`
Create a new column. This method corresponds to a [POST request at /column](https://docs.slicingdice.com/docs/how-to-create-columns#section-creating-columns-using-column-endpoint).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_API_KEY'
});

column = {
    "name": "Year",
    "api-name": "year",
    "type": "integer",
    "description": "Year of manufacturing",
    "storage": "latest-value"
};

client.createColumn(column).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
    "status": "success",
    "api-name": "year"
}
```

### `insert(jsonData)`
Insert data to existing entities or create new entities, if necessary. This method corresponds to a [POST request at /insert](https://docs.slicingdice.com/docs/how-to-insert-data).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_API_KEY',
    writeKey: 'WRITE_API_KEY'
});

const insertData = {
    "user1@slicingdice.com": {
        "car-model": "Ford Ka",
        "year": 2016
    },
    "user2@slicingdice.com": {
        "car-model": "Honda Fit",
        "year": 2016
    },
    "user3@slicingdice.com": {
        "car-model": "Toyota Corolla",
        "year": 2010,
        "test-drives": [
            {
                "value": "NY",
                "date": "2016-08-17T13:23:47+00:00"
            }, {
                "value": "NY",
                "date": "2016-08-17T13:23:47+00:00"
            }, {
                "value": "CA",
                "date": "2016-04-05T10:20:30Z"
            }
        ]
    },
    "user4@slicingdice.com": {
        "car-model": "Ford Ka",
        "year": 2005,
        "test-drives": {
            "value": "NY",
            "date": "2016-08-17T13:23:47+00:00"
        }
    }
};

client.insert(insertData).then((resp) => {
   console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
    "status": "success",
    "inserted-entities": 4,
    "inserted-columns": 10,
    "took": 0.023
}
```

### `existsEntity(ids, dimension = null)`
Verify which entities exist in a tabdimensionle (uses `default` dimension if not provided) given a list of entity IDs. This method corresponds to a [POST request at /query/exists/entity](https://docs.slicingdice.com/docs/exists).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

ids = [
        "user1@slicingdice.com",
        "user2@slicingdice.com",
        "user3@slicingdice.com"
];

client.existsEntity(ids).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
    "status": "success",
    "exists": [
        "user1@slicingdice.com",
        "user2@slicingdice.com"
    ],
    "not-exists": [
        "user3@slicingdice.com"
    ],
    "took": 0.103
}
```

### `countEntityTotal()`
Count the number of inserted entities in the whole database. This method corresponds to a [POST request at /query/count/entity/total](https://docs.slicingdice.com/docs/total).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

client.countEntityTotal().then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
    "status": "success",
    "result": {
        "total": 42
    },
    "took": 0.103
}
```

### `countEntityTotal(dimensions)`
Count the total number of inserted entities in the given dimensions. This method corresponds to a [POST request at /query/count/entity/total](https://docs.slicingdice.com/docs/total#section-counting-specific-tables).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

const dimensions = ["default"];

client.countEntityTotal(dimensions).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
    "status": "success",
    "result": {
        "total": 42
    },
    "took": 0.103
}
```

### `countEntity(jsonData)`
Count the number of entities matching the given query. This method corresponds to a [POST request at /query/count/entity](https://docs.slicingdice.com/docs/count-entities).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

const query = [
    {
        "query-name": "corolla-or-fit",
        "query": [
            {
                "car-model": {
                    "equals": "toyota corolla"
                }
            },
            "or",
            {
                "car-model": {
                    "equals": "honda fit"
                }
            }
        ],
        "bypass-cache": false
    },
    {
        "query-name": "ford-ka",
        "query": [
            {
                "car-model": {
                    "equals": "ford ka"
                }
            }
        ],
        "bypass-cache": false
    }
];

client.countEntity(query).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "result":{
      "ford-ka":2,
      "corolla-or-fit":2
   },
   "took":0.083,
   "status":"success"
}
```

### `countEvent(jsonData)`
Count the number of occurrences for time-series events matching the given query. This method corresponds to a [POST request at /query/count/event](https://docs.slicingdice.com/docs/count-events).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

const query = [
    {
        "query-name": "test-drives-in-ny",
        "query": [
            {
                "test-drives": {
                    "equals": "NY",
                    "between": [
                        "2016-08-16T00:00:00Z",
                        "2016-08-18T00:00:00Z"
                    ]
                }
            }
        ],
        "bypass-cache": true
    },
    {
        "query-name": "test-drives-in-ca",
        "query": [
            {
                "test-drives": {
                    "equals": "CA",
                    "between": [
                        "2016-04-04T00:00:00Z",
                        "2016-04-06T00:00:00Z"
                    ]
                }
            }
        ],
        "bypass-cache": true
    }
];

client.countEvent(query).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "result":{
      "test-drives-in-ny":3,
      "test-drives-in-ca":0
   },
   "took":0.063,
   "status":"success"
}
```

### `topValues(jsonData)`
Return the top values for entities matching the given query. This method corresponds to a [POST request at /query/top_values](https://docs.slicingdice.com/docs/top-values).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

query = {
  "car-year": {
    "year": 2
  },
  "car models": {
    "car-model": 3
  }
}

client.topValues(query).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "result":{
      "car models":{
         "car-model":[
            {
               "quantity":2,
               "value":"ford ka"
            },
            {
               "quantity":1,
               "value":"honda fit"
            },
            {
               "quantity":1,
               "value":"toyota corolla"
            }
         ]
      },
      "car-year":{
         "year":[
            {
               "quantity":2,
               "value":"2016"
            },
            {
               "quantity":1,
               "value":"2010"
            }
         ]
      }
   },
   "took":0.034,
   "status":"success"
}
```

### `aggregation(jsonData)`
Return the aggregation of all columns in the given query. This method corresponds to a [POST request at /query/aggregation](https://docs.slicingdice.com/docs/aggregations).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

query = {
  "query": [
    {
      "year": 2
    },
    {
      "car-model": 2,
      "equals": [
        "honda fit",
        "toyota corolla"
      ]
    }
  ]
};

client.aggregation(query).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "result":{
      "year":[
         {
            "quantity":2,
            "value":"2016",
            "car-model":[
               {
                  "quantity":1,
                  "value":"honda fit"
               }
            ]
         },
         {
            "quantity":1,
            "value":"2005"
         }
      ]
   },
   "took":0.079,
   "status":"success"
}
```

### `getSavedQueries()`
Get all saved queries. This method corresponds to a [GET request at /query/saved](https://docs.slicingdice.com/docs/saved-queries).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY'
});

client.getSavedQueries().then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
    "status": "success",
    "saved-queries": [
        {
            "name": "users-in-ny-or-from-ca",
            "type": "count/entity",
            "query": [
                {
                    "state": {
                        "equals": "NY"
                    }
                },
                "or",
                {
                    "state-origin": {
                        "equals": "CA"
                    }
                }
            ],
            "cache-period": 100
        }, {
            "name": "users-from-ca",
            "type": "count/entity",
            "query": [
                {
                    "state": {
                        "equals": "NY"
                    }
                }
            ],
            "cache-period": 60
        }
    ],
    "took": 0.103
}
```

### `createSavedQuery(jsonData)`
Create a saved query at SlicingDice. This method corresponds to a [POST request at /query/saved](https://docs.slicingdice.com/docs/saved-queries).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY'
});

query = {
  "name": "my-saved-query",
  "type": "count/entity",
  "query": [
    {
      "car-model": {
        "equals": "honda fit"
      }
    },
    "or",
    {
      "car-model": {
        "equals": "toyota corolla"
      }
    }
  ],
  "cache-period": 100
}

client.createSavedQuery(query).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "took":0.053,
   "query":[
      {
         "car-model":{
            "equals":"honda fit"
         }
      },
      "or",
      {
         "car-model":{
            "equals":"toyota corolla"
         }
      }
   ],
   "name":"my-saved-query",
   "type":"count/entity",
   "cache-period":100,
   "status":"success"
}
```

### `updateSavedQuery(queryName, jsonData)`
Update an existing saved query at SlicingDice. This method corresponds to a [PUT request at /query/saved/QUERY_NAME](https://docs.slicingdice.com/docs/saved-queries).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY'
});

newQuery = {
  "type": "count/entity",
  "query": [
    {
      "car-model": {
        "equals": "ford ka"
      }
    },
    "or",
    {
      "car-model": {
        "equals": "toyota corolla"
      }
    }
  ],
  "cache-period": 100
};

client.updateSavedQuery("my-saved-query", newQuery).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "took":0.037,
   "query":[
      {
         "car-model":{
            "equals":"ford ka"
         }
      },
      "or",
      {
         "car-model":{
            "equals":"toyota corolla"
         }
      }
   ],
   "type":"count/entity",
   "cache-period":100,
   "status":"success"
}
```

### `getSavedQuery(queryName)`
Executed a saved query at SlicingDice. This method corresponds to a [GET request at /query/saved/QUERY_NAME](https://docs.slicingdice.com/docs/saved-queries).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

client.getSavedQuery("my-saved-query").then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "result":{
      "query":2
   },
   "took":0.035,
   "query":[
      {
         "car-model":{
            "equals":"honda fit"
         }
      },
      "or",
      {
         "car-model":{
            "equals":"toyota corolla"
         }
      }
   ],
   "type":"count/entity",
   "status":"success"
}
```

### `deleteSavedQuery(queryName)`
Delete a saved query at SlicingDice. This method corresponds to a [DELETE request at /query/saved/QUERY_NAME](https://docs.slicingdice.com/docs/saved-queries).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY'
});

client.deleteSavedQuery("my-saved-query").then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "took":0.029,
   "query":[
      {
         "car-model":{
            "equals":"honda fit"
         }
      },
      "or",
      {
         "car-model":{
            "equals":"toyota corolla"
         }
      }
   ],
   "type":"count/entity",
   "cache-period":100,
   "status":"success",
   "deleted-query":"my-saved-query"
}
```

### `result(jsonData)`
Retrieve inserted values for entities matching the given query. This method corresponds to a [POST request at /data_extraction/result](https://docs.slicingdice.com/docs/result-extraction).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

query = {
  "query": [
    {
      "car-model": {
        "equals": "ford ka"
      }
    },
    "or",
    {
      "car-model": {
        "equals": "toyota corolla"
      }
    }
  ],
  "columns": ["car-model", "year"],
  "limit": 2
};

client.result(query).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "took":0.113,
   "next-page":null,
   "data":{
      "customer5@mycustomer.com":{
         "year":"2005",
         "car-model":"ford ka"
      },
      "user1@slicingdice.com":{
         "year":"2016",
         "car-model":"ford ka"
      }
   },
   "page":1,
   "status":"success"
}
```

### `score(jsonData)`
Retrieve inserted values as well as their relevance for entities matching the given query. This method corresponds to a [POST request at /data_extraction/score](https://docs.slicingdice.com/docs/score-extraction).

#### Request example

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

query = {
  "query": [
    {
      "car-model": {
        "equals": "ford ka"
      }
    },
    "or",
    {
      "car-model": {
        "equals": "toyota corolla"
      }
    }
  ],
  "columns": ["car-model", "year"],
  "limit": 2
};

client.score(query).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "took":0.063,
   "next-page":null,
   "data":{
      "user3@slicingdice.com":{
         "score":1,
         "year":"2010",
         "car-model":"toyota corolla"
      },
      "user2@slicingdice.com":{
         "score":1,
         "year":"2016",
         "car-model":"honda fit"
      }
   },
   "page":1,
   "status":"success"
}
```

### `sql(query)`
Retrieve inserted values using a SQL syntax. This method corresponds to a POST request at /query/sql.

#### Query statement

```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

query = "SELECT COUNT(*) FROM default WHERE age BETWEEN 0 AND 49";

client.sql(query).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Insert statement
```javascript
let SlicingDice = require('slicerjs');

const client = new SlicingDice({
    masterKey: 'MASTER_KEY',
    readKey: 'READ_KEY'
});

query = "INSERT INTO default([entity-id], name, age) VALUES(1, 'john', 10)";

client.sql(query).then((resp) => {
    console.log(resp);
}, (err) => {
    console.error(err);
});
```

#### Output example

```json
{
   "took":0.063,
   "result":[
       {"COUNT": 3}
   ],
   "count":1,
   "status":"success"
}
```

## License

[MIT](https://opensource.org/licenses/MIT)
