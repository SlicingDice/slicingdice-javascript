(function(){
    'use strict'
    // add http module to make requests
    let https = require('https');
    const url = require('url');
    // add api mapped errors to client
    let mappedErrors = require('./mappedErrors');
    // add all errors
    let errors = require('./errors');

    // RequesterBrowser make http requests from the browser
    class RequesterBrowser {
        run(token, url, reqType, data = null) {
            url = url.hostname + url.path;
            //console.log(data);
            return new Promise(function(resolve, reject) {
                let req = new XMLHttpRequest();
                req.open(reqType, url, true);
                req.setRequestHeader("Authorization", token);
                req.setRequestHeader('Content-Type', 'application/json');
                req.setRequestHeader('Access-Control-Allow-Origin', '*');
                req.setRequestHeader('Access-Control-Allow-Credentials', true);
                req.setRequestHeader('Accept', "application/json");
                req.onload = function() {
                    if (req.status == 200) {
                        // Resolve the promise with the response text
                        resolve(req.response);
                    }
                    else {
                        reject(Error(req.statusText));
                    }
                };

                // Handle network errors
                req.onerror = function() {
                    reject(Error("Network Error"));
                };
                req.send(JSON.stringify(data));
            });
        }
    }

    // RequesterBrowser make http requests from the node.js
    class RequesterNode {
        run(token, urlReq, reqType, data = null) {

            return new Promise((resolve, reject) => {
                let port;
                let jsonToSend;
                let urlData = url.parse(urlReq);
                if (urlData.port === null){
                    port = 443;
                } else{
                    port = urlData.port;
                }
                let headers = {
                    'Content-type': 'application/json',
                    'Authorization': token
                }
                if (data !== null) {
                    jsonToSend = JSON.stringify(data);
                    headers['Content-Length'] = Buffer.byteLength(jsonToSend);
                }
                let options = {
                    hostname: urlData.hostname,
                    port: port,
                    path: urlData.path,
                    method: reqType,
                    headers: headers,
                    rejectUnauthorized: false,
                };
                let req = https.request(options, function(response){

                    // temporary data holder
                    const body = [];
                    // on every content chunk, push it to the data array
                    response.on('data', (data) => body.push(data));
                    // we are done, resolve promise with those joined chunks
                    response.on('end', () => {
                        resolve(body.join(''));
                    });
                });
                if (reqType == "POST" || reqType == "PUT"){
                    req.write(jsonToSend);
                }

                req.on('error', (err) => reject(err));
                req.end();
            });
        }
    }

    // VALIDATORS
    class SDBaseQueryValidator {
        constructor(query) {
            this.query = query;
        }
    }

    class SavedQueryValidator extends SDBaseQueryValidator {
        constructor(query) {
            super(query)
            this.listQueryTypes = [
                "count/entity", "count/event", "count/entity/total",
                "aggregation", "top_values"];
        }

        _has_valid_type(){
            let typeQuery = this.query.type;
            if (!this.listQueryTypes.includes(typeQuery)) {
                throw new errors.InvalidQueryTypeError("The saved query has an invalid type(" + typeQuery + ")");
            }
            return true;
        }

        validator() {
            return this._has_valid_type();
        }
    }

    class QueryCountValidator extends SDBaseQueryValidator {
        constructor(query){
            super(query)
        }

        validator() {
            if (Object.keys(this.query).length > 10) {
                throw new errors.MaxLimitError("The query count entity has a limit of 10 queries peer request.");
            }
            return true;
        }
    }

    class QueryTopValuesValidator extends SDBaseQueryValidator{
        constructor(query) {
            super(query)
        }

        _exceedsQueriesLimit() {
            if (Object.keys(this.query).length > 5) {
                return true;
            }
            return false;
        }

        _exceedsFieldsLimit() {
            for(let key in this.query) {
                let field = this.query[key];
                if (Object.keys(field).length > 5){
                    throw new errors.MaxLimitError("The query " + field + " exceeds the limit of fields per query in request");
                }
            }
        }

        _exceedsValuesContainsLimit() {
            for (let key in this.query){
                let query = this.query[key];
                if (query.hasOwnProperty("contains") && query["contains"].length > 5) {
                    throw new errors.MaxLimitError("The query " + query + " exceeds the limit of contains per query in request");
                }
            }
        }

        validator() {
            this._exceedsFieldsLimit();
            this._exceedsValuesContainsLimit();
            if (!this._exceedsQueriesLimit()){
                return true
            }
            return false;
        }
    }

    class QueryDataExtractionValidator extends SDBaseQueryValidator{
        constructor(query) {
            super(query)
        }

        validKeys() {
            for(let key in this.query) {
                let value = this.query.key;
                if (key == "query") {
                    return true;
                }
                if (key == "fields") {
                    if (value.constructor != Array) {
                        throw new errors.InvalidQueryException("The key 'fields' in query has a invalid value.");
                    }
                    else {
                        if (value.length > 10) {
                           throw new errors.InvalidQueryException("The key 'fields' in data extraction result must have up to 10 fields.");
                        }
                    }
                }
                if (key == "limit") {
                    if (value.constructor != Number){
                        throw new errors.InvalidQueryError("The key 'limit' in query has a invalid value.");
                    }
                    else if (value > 100){
                        throw new errors.InvalidQueryError("The field 'limit' has a value max of 100.");
                    }
                }
                else {
                    throw new errors.InvalidQueryError("This query have the " + key + " invalid key.");
                }
            }
            return true;
        }

        validator() {
            return this.validKeys();
        }
    }

    class FieldValidator extends SDBaseQueryValidator{
        constructor(query) {
            super(query)
        }

        validateName() {
            if (!this.query.hasOwnProperty("name")) {
                throw new errors.InvalidFieldDescriptionError("The field's description can't be empty/None.");
            }
            else {
                let name = this.query["name"];
                if (name.length > 80) {
                    throw new errors.InvalidFieldDescriptionError("The field's name have a very big name.(Max: 80 chars)");
                }
            }
        }

        validateDescription() {
            let description = this.query.description;
            if (description.length > 80){
                throw new errors.InvalidFieldDescriptionError("The field's description have a very big name.(Max: 300chars)");
            }
        }


        validateFieldType() {
            if (!this.query.hasOwnProperty("type")){
                throw new errors.InvalidFieldError("The field should have a type.");
            }
        }

        valdiateDecimalPlace() {
            let decimal_types = ["decimal", "decimal-time-series"];
            if (!decimal_types.includes(this.query["decimal-place"])) {
                throw new errors.InvalidFieldError("This field is only accepted on type 'decimal' or 'decimal-time-series'");
            }
        }

        checkStrTypeIntegrity() {
            if (!this.query.hasOwnProperty("cardinality")){
                throw new errors.InvalidFieldError("The field with type string should have 'cardinality' key.");
            }
        }

        validateEnumeratedType() {
            if (!this.query.hasOwnProperty("range")){
                throw new errors.InvalidFieldError("The 'enumerated' type needs of the 'range' parameter.");
            }
        }

        validator() {
            this.validateName();
            this.validateFieldType();
            if (this.query["type"] == "string") {
                this.checkStrTypeIntegrity();
            }
            if (this.query["type"] == "enumerated") {
                this.validateEnumeratedType();
            }
            if (this.query.hasOwnProperty("description")) {
                this.validateDescription();
            }
            if (this.query.hasOwnProperty('decimal-place')) {
                this.valdiateDecimalPlace();
            }
            return true;
        }
    }

    // SLICER CLASS AND RESPONSE
    class SlicerResponse {
        constructor(jsonResponse) {
            this.jsonResponse = JSON.parse(jsonResponse);
        }

        _raiseErrors(error) {
            let codeError = error['code'];
            if (mappedErrors[codeError] === undefined){
                throw new errors.SlicingDiceClientError(error["message"]);
            } else {
                throw new Error(error["message"]);
            }
        }

        requestSuccessful(){
            if (this.jsonResponse["errors"] !== undefined){
                this._raiseErrors(this.jsonResponse["errors"][0]);
            }
            return true;
        }
    }

    class SlicingDice{
        constructor(key) {
            this._key = key;
            this._checkKey(key);
            this._sdRoutes = {
                field: '/field/',
                index: '/index/',
                countEntity: '/query/count/entity/',
                countEntityTotal: '/query/count/entity/total/',
                countEvent: '/query/count/event/',
                aggregation: '/query/aggregation/',
                topValues: '/query/top_values/',
                existsEntity: '/query/exists/entity/',
                result: '/data_extraction/result/',
                score: '/data_extraction/score/',
                saved: '/query/saved/',
                project: '/project/'
            };
            this._setUpRequest();
        }

        get sdAddress() {
            return this.BASE_URL;
        }

        set sdAddress(value){
            this.BASE_URL = value;
        }

        _checkKey(key) {
            if (!key.hasOwnProperty("writeKey") && !key.hasOwnProperty("readKey") && !key.hasOwnProperty("masterKey") && !key.hasOwnProperty("customKey")) {
                throw new errors.InvalidKeyError("The keys aren't valid.");
            }
        }

        _setUpRequest(){
            if (typeof window === 'undefined'){
                this.requester = new RequesterNode();
                this.BASE_URL = this._getEnviromentSDAddress();
            }
            else{
                this.requester = new RequesterBrowser();
                this.BASE_URL = "https://api.slicingdice.com/v1";
            }
        }

        _getEnviromentSDAddress() {
            let sdAddress = process.env.SD_API_ADDRESS;
            if (sdAddress === undefined){
                return "https://api.slicingdice.com/v1";
            }
            else {
                return sdAddress;
            }
        }

        _getCurrentKey(){
            if (this._key.hasOwnProperty("masterKey"))
                return [this._key["masterKey"], 2];
            else if(this._key.hasOwnProperty("customKey"))
                return [this._key["customKey"], 2];
            else if(this._key.hasOwnProperty("writeKey"))
                return [this._key["writeKey"], 1];
            else
                return [this._key["readKey"], 0];
        }

        _getAPIKey(levelKey){
            let currentLevelKey = this._getCurrentKey();
            if (currentLevelKey[1] == 2){
                return currentLevelKey[0];
            }
            else if (currentLevelKey[1] != levelKey){
                throw new errors.InvalidKeyError("This key is not allowed to perform this operation.")
            }
            return currentLevelKey[0];
        }

        makeRequest(objRequest) {
            let token = this._getAPIKey(objRequest.levelKey);
            let urlReq;
            if (objRequest.test){
                urlReq = this.BASE_URL + "/test" + objRequest.path;
            } else {
                urlReq = this.BASE_URL + objRequest.path;
            }
            let requestMethods = ["POST", "PUT", "GET", "DELETE", "PATCH"];
            if (requestMethods.indexOf(objRequest.reqType) === -1){
                throw new errors.InvalidMethodRequestError('This method request is invalid.');
            }
            let req = this.requester.run(
                token,
                urlReq,
                objRequest.reqType,
                objRequest.data);
            
            return req.then((resp) => {
                let slicerResponse = new SlicerResponse(resp);
                slicerResponse.requestSuccessful();
                return JSON.parse(resp);
            }, (err) => { return err;});
        }

        getProjects(test = false){
            let path = this._sdRoutes.project;
            return this.makeRequest({
                path: path,
                reqType: "GET",
                levelKey: 2,
                test: test
            });
        }

        getFields(test = false){
            let path = this._sdRoutes.field;
            return this.makeRequest({
                path: path,
                reqType: "GET",
                levelKey: 2,
                test: test
            });
        }

        getSavedQueries(test = false) {
            let path = this._sdRoutes.saved;
            return this.makeRequest({
                path: path,
                reqType: "GET",
                levelKey: 2,
                test: test
            });
        }

        deleteSavedQuery(name, test = false) {
            let path = this._sdRoutes.saved + name;
            return this.makeRequest({
                path: path,
                reqType: "DELETE",
                levelKey: 2,
                teste: test
            });
        }

        getSavedQuery(name, test = false) {
            let path = this._sdRoutes.saved + name;
            return this.makeRequest({
                path: path,
                reqType: "GET",
                levelKey: 0,
                test: test,
            });
        }

        index(query, autoCreateFields = false, test = false){
            if (autoCreateFields){
                query["auto-create-fields"] = true
            }
            //console.log(query);
            let path = this._sdRoutes.index;
            return this.makeRequest({
                path: path,
                reqType: "POST",
                data: query,
                levelKey: 1,
                test: test
            });
        }

        createField(query, test = false){
            let path = this._sdRoutes.field;
            let sdValidator = new FieldValidator(query);
            if (sdValidator.validator()){
                return this.makeRequest({
                    path: path,
                    reqType: "POST",
                    data: query,
                    levelKey: 1,
                    test: test
                });
            }
        }

        countQueryWrapper(query, path, test){
            let sdValidator = new QueryCountValidator(query);
            if (sdValidator.validator()){
                return this.makeRequest({
                    path: path,
                    reqType: "POST",
                    data: query,
                    levelKey: 0,
                    test: test
                });
            }
        }

        countEntity(query, test = false){
            let path = this._sdRoutes.countEntity;
            let sdValidator = new QueryCountValidator(query);
            return this.countQueryWrapper(query, path, test);
        }

        countEntityTotal(test = false) {
            let path  = this._sdRoutes.countEntityTotal;
            return this.makeRequest({
                path: path,
                reqType: "GET",
                levelKey: 0,
                test: test
            })
        }

        countEvent(query, test = false){
            let path = this._sdRoutes.countEvent;
            return this.countQueryWrapper(query, path, test);
        }

        existsEntity(ids, test = false) {
            if (ids.constructor != Array){
                throw new errors.WrongTypeError("This methods recieve a Array how parameter");
            }
            if (ids.length > 10){
                throw new errors.MaxLimitError("The query exists entity must have up to 100 ids.");
            }
            let path = this._sdRoutes.existsEntity;
            let query = {
                "ids": ids
            }
            return this.makeRequest({
                path: path,
                reqType: "POST",
                data: query,
                levelKey: 0,
                test: test
            });
        }

        aggregation(query, test = false){
            let path = this._sdRoutes.aggregation;
            return this.makeRequest({
                path: path,
                reqType: "POST",
                data: query,
                levelKey: 0,
                test: test
            });
        }

        topValues(query, test = false) {
            let path = this._sdRoutes.topValues;
            let sdValidator = new QueryTopValuesValidator(query);
            if (sdValidator.validator()){
                return this.makeRequest({
                    path: path,
                    reqType: "POST",
                    data: query,
                    levelKey: 0,
                    test: test
                });
            }
        }

        createSavedQuery(query, test) {
            let path = this._sdRoutes.saved;
            let sdValidator = new SavedQueryValidator(query);
            if (sdValidator.validator()){
                return this.makeRequest({
                    path: path,
                    reqType: "POST",
                    data: query,
                    levelKey: 2,
                    test: test
                });
            }
        }

        updateSavedQuery(name, query, test = false) {
            let path = this._sdRoutes.saved + name;
            return this.makeRequest({
                path: path,
                reqType: "PUT",
                data: query,
                levelKey: 2,
                test: test
            });
        }

        dataExtractionWrapper(query, path, test) {
            let sdValidator = new QueryDataExtractionValidator(query);
            if (sdValidator.validator()){
                return this.makeRequest({
                    path: path,
                    reqType: "POST",
                    data: query,
                    levelKey: 0,
                    test: test
                });
            }
        }

        result(query, test = false) {
            let path = this._sdRoutes.result;
            return this.dataExtractionWrapper(query, path, test);
        }

        score(query, test = false) {
            let path = this._sdRoutes.score;
            return this.dataExtractionWrapper(query, path, test);
        }
    }

    module.exports = SlicingDice;
    if (typeof window !== 'undefined'){
        window.SlicingDice = SlicingDice;
    }
}());