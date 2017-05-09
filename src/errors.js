class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message; 
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else { 
      this.stack = (new Error(message)).stack; 
    }
  }
}

class SlicingDiceError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

// AUTHENTICATION ERRORS
class AuthMissingHeaderError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class AuthAPIKeyError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class AuthInvalidAPIKeyError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class AuthIncorrectPermissionError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class AuthInvalidRemoteAddrError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class CustomkeyInvalidColumnCreationError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class CustomKeyInvalidPermissionForColumnError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class CustomKeyInvalidOperationError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class CustomKeyRouteNotPermittedError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class CustomKeyNotPermittedError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class DemoApiInvalidEndpointError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

// REQUEST ERRORS
class RequestIncorrectContentTypeValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class RequestMissingContentTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class RequestRateLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class RequestInvalidJsonError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class RequestInvalidHttpMethodError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class RequestInvalidEndpointError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class RequestIncorrectHttpError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class RequestExceededLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

// ACCOUNT ERRORS
class AccountMissingPaymentMethodError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class AccountPaymentRequiredError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class AccountBannedError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class AccountDisabledError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

// COLUMN ERRORS
class ColumnMissingParamError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnIntegerValuesError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnAlreadyExistsError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnTimeSeriesLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnTimeSeriesSystemLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnDecimalTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnStorageValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnInvalidApiNameError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnInvalidNameError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnInvalidDescriptionError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnExceededDescriptionlengthError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnInvalidCardinalityError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnDecimalLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnRangeLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnExceededMaxNameLenghtError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnExceededMaxApiNameLenghtError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnEmptyEntityIdError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class ColumnExceededPermitedValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

// INSERTION ERRORS
class InsertInvalidDecimalPlacesError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertEntityValueTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertColumnNameTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertColumnTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertEntityNameTooBigError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertColumnValueTooBigError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertTimeSeriesDateFormatError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertColumnNotActiveError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertColumnLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertDateFormatError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

class InsertIdLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertColumnStringEmptyValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertColumnTimeSeriesInvalidParameterError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertColumnNumericInvalidValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class InsertColumnTimeSeriesMissingValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryTimeSeriesInvalidPrecisionSecondsError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryTimeSeriesInvalidPrecisionMinutesError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryTimeSeriesInvalidPrecisionHoursError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryDateFormatError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

class QueryRelativeIntervalError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

// QUERY ERRORS
class QueryMissingQueryError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryInvalidTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryMissingTypeParamError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryColumnLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryInvalidOperatorError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryIncorrectOperatorUsageError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryColumnNotActiveError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryMissingOperatorError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryIncompleteError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryEventCountQueryError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryInvalidMetricError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryIntegerError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryLevelLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryBadAggsFormationError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryInvalidFilterValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryMetricsLevelError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryTimeSeriesError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryMetricsTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryContainsNumericError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryExistsEntityLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryMultipleFiltersError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryMissingNameParamError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QuerySavedAlreadyExistsError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QuerySavedNotExistsError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QuerySavedInvalidTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class MethodNotAllowedError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryExistsMissingIdsError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryInvalidFormatError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryTopValuesParameterEmptyError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryDataExtractionLimitValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryDataExtractionLimitValueTooBigError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryDataExtractionLimitAndPageTokenValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryDataExtractionPageTokenValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryDataExtractionColumnLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryExistsEntityEmptyError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QuerySavedInvalidQueryValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QuerySavedInvalidCachePeriodValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QuerySavedInvalidNameError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryCountInvalidParameterError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryAggregationInvalidParameterError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryAggregationInvalidFilterQueryError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class QueryInvalidMinfreqError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

class QueryExceededMaxNumberQuerysError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

class QueryInvalidOperatorUsageError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

class QueryInvalidParameterUsageError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

class QueryParameterInvalidColumnUsageError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

class QueryInvalidColumnUsageError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}


class ColumnCreateInternalError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

// CLIENT ERRORS
class InternalError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class InvalidQueryTypeError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class MaxLimitError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class InvalidQueryError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class InvalidColumnDescriptionError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class SlicingDiceClientError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}


class WrongTypeError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class InvalidColumnError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class InvalidColumnTypeError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class InvalidKeyError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class InvalidMethodRequestError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class InsertInvalidRangeException extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

module.exports = {
    "AuthMissingHeaderError" : AuthMissingHeaderError,
    "AuthAPIKeyError": AuthAPIKeyError,
    "AuthInvalidAPIKeyError": AuthInvalidAPIKeyError,
    "AuthIncorrectPermissionError": AuthIncorrectPermissionError,
    "AuthInvalidRemoteAddrError": AuthInvalidRemoteAddrError,
    "CustomKeyInvalidColumnCreationError": CustomkeyInvalidColumnCreationError,
    "CustomKeyInvalidPermissionForColumnError": CustomKeyInvalidPermissionForColumnError,
    "CustomKeyInvalidOperationError": CustomKeyInvalidOperationError,
    "CustomKeyNotPermittedError": CustomKeyNotPermittedError,
    "CustomKeyRouteNotPermittedError": CustomKeyRouteNotPermittedError,
    "DemoApiInvalidEndpointError": DemoApiInvalidEndpointError,
    // Request validations (21 - 29)
    "RequestMissingContentTypeError": RequestMissingContentTypeError,
    "RequestIncorrectContentTypeValueError": RequestIncorrectContentTypeValueError,
    "RequestRateLimitError": RequestRateLimitError,
    "RequestInvalidJsonError": RequestInvalidJsonError,
    "RequestInvalidHttpMethodError": RequestInvalidHttpMethodError,
    "RequestInvalidEndpointError": RequestInvalidEndpointError,
    "RequestIncorrectHttpError": RequestIncorrectHttpError,
    "RequestExceededLimitError": RequestExceededLimitError,
    // Account Errors (30 - 39)
    "AccountMissingPaymentMethodError": AccountMissingPaymentMethodError,
    "AccountPaymentRequiredError": AccountPaymentRequiredError,
    "AccountBannedError": AccountBannedError,
    "AccountDisabledError": AccountDisabledError,
    // Column errors (40 - 59)
    "ColumnMissingParamError": ColumnMissingParamError,
    "ColumnTypeError": ColumnTypeError,
    "ColumnIntegerValuesError": ColumnIntegerValuesError,
    "ColumnAlreadyExistsError": ColumnAlreadyExistsError,
    "ColumnLimitError": ColumnLimitError,
    "ColumnTimeSeriesLimitError": ColumnTimeSeriesLimitError,
    "ColumnTimeSeriesSystemLimitError": ColumnTimeSeriesSystemLimitError,
    "ColumnDecimalTypeError": ColumnDecimalTypeError,
    "ColumnStorageValueError": ColumnStorageValueError,
    "ColumnInvalidApiNameError": ColumnInvalidApiNameError,
    "ColumnInvalidNameError": ColumnInvalidNameError,
    "ColumnInvalidDescriptionError": ColumnInvalidDescriptionError,
    "ColumnExceededDescriptionlengthError": ColumnExceededDescriptionlengthError,
    "ColumnInvalidCardinalityError": ColumnInvalidCardinalityError,
    "ColumnDecimalLimitError": ColumnDecimalLimitError,
    "ColumnRangeLimitError": ColumnRangeLimitError,
    "ColumnExceededMaxNameLenghtError": ColumnExceededMaxNameLenghtError,
    "ColumnExceededMaxApiNameLenghtError": ColumnExceededMaxApiNameLenghtError,
    "ColumnEmptyEntityIdError": ColumnEmptyEntityIdError,
    "ColumnExceededPermitedValueError": ColumnExceededPermitedValueError,
    // Insert errors (60 - 79)
    "InsertInvalidDecimalPlacesError": InsertInvalidDecimalPlacesError,
    "InsertEntityValueTypeError": InsertEntityValueTypeError,
    "InsertColumnNameTypeError": InsertColumnNameTypeError,
    "InsertColumnTypeError": InsertColumnTypeError,
    "InsertEntityNameTooBigError": InsertEntityNameTooBigError,
    "InsertColumnValueTooBigError": InsertColumnValueTooBigError,
    "InsertTimeSeriesDateFormatError": InsertTimeSeriesDateFormatError,
    "InsertColumnNotActiveError": InsertColumnNotActiveError,
    "InsertIdLimitError": InsertIdLimitError,
    "InsertColumnLimitError": InsertColumnLimitError,
    "InsertDateFormatError": InsertDateFormatError,
    "InsertColumnStringEmptyValueError": InsertColumnStringEmptyValueError,
    "InsertColumnTimeSeriesInvalidParameterError": InsertColumnTimeSeriesInvalidParameterError,
    "InsertColumnNumericInvalidValueError": InsertColumnNumericInvalidValueError,
    "InsertColumnTimeSeriesMissingValueError": InsertColumnTimeSeriesMissingValueError,
    "QueryTimeSeriesInvalidPrecisionSecondsError": QueryTimeSeriesInvalidPrecisionSecondsError,
    "QueryTimeSeriesInvalidPrecisionMinutesError": QueryTimeSeriesInvalidPrecisionMinutesError,
    "QueryTimeSeriesInvalidPrecisionHoursError": QueryTimeSeriesInvalidPrecisionHoursError,
    "QueryDateFormatError": QueryDateFormatError,
    "QueryRelativeIntervalError": QueryRelativeIntervalError,
    // Query errors (80 - 109)
    "QueryMissingQueryError": QueryMissingQueryError,
    "QueryInvalidTypeError": QueryInvalidTypeError,
    "QueryMissingTypeParamError": QueryMissingTypeParamError,
    "QueryInvalidOperatorError": QueryInvalidOperatorError,
    "QueryIncorrectOperatorUsageError": QueryIncorrectOperatorUsageError,
    "QueryColumnNotActiveError": QueryColumnNotActiveError,
    "QueryMissingOperatorError": QueryMissingOperatorError,
    "QueryIncompleteError": QueryIncompleteError,
    "QueryEventCountQueryError": QueryEventCountQueryError,
    "QueryInvalidMetricError": QueryInvalidMetricError,
    "QueryIntegerError": QueryIntegerError,
    "QueryColumnLimitError": QueryColumnLimitError,
    "QueryLevelLimitError": QueryLevelLimitError,
    "QueryBadAggsFormationError": QueryBadAggsFormationError,
    "QueryInvalidFilterValueError": QueryInvalidFilterValueError,
    "QueryMetricsLevelError": QueryMetricsLevelError,
    "QueryTimeSeriesError": QueryTimeSeriesError,
    "QueryMetricsTypeError": QueryMetricsTypeError,
    "QueryContainsNumericError": QueryContainsNumericError,
    "QueryExistsEntityLimitError": QueryExistsEntityLimitError,
    "QueryMultipleFiltersError": QueryMultipleFiltersError,
    "QueryMissingNameParamError": QueryMissingNameParamError,
    "QuerySavedAlreadyExistsError": QuerySavedAlreadyExistsError,
    "QuerySavedNotExistsError": QuerySavedNotExistsError,
    "QuerySavedInvalidTypeError": QuerySavedInvalidTypeError,
    "MethodNotAllowedError": MethodNotAllowedError,
    "QueryExistsMissingIdsError": QueryExistsMissingIdsError,
    "QueryInvalidFormatError": QueryInvalidFormatError,
    "QueryTopValuesParameterEmptyError": QueryTopValuesParameterEmptyError,
    "QueryDataExtractionLimitValueError": QueryDataExtractionLimitValueError,
    "QueryDataExtractionLimitValueTooBigError": QueryDataExtractionLimitValueTooBigError,
    "QueryDataExtractionLimitAndPageTokenValueError": QueryDataExtractionLimitAndPageTokenValueError,
    "QueryDataExtractionPageTokenValueError": QueryDataExtractionPageTokenValueError,
    "QueryDataExtractionColumnLimitError": QueryDataExtractionColumnLimitError,
    "QueryExistsEntityEmptyError": QueryExistsEntityEmptyError,
    "QuerySavedInvalidQueryValueError": QuerySavedInvalidQueryValueError,
    "QuerySavedInvalidCachePeriodValueError": QuerySavedInvalidCachePeriodValueError,
    "QuerySavedInvalidNameError": QuerySavedInvalidNameError,
    "QueryCountInvalidParameterError": QueryCountInvalidParameterError,
    "QueryAggregationInvalidParameterError": QueryAggregationInvalidParameterError,
    "QueryAggregationInvalidFilterQueryError": QueryAggregationInvalidFilterQueryError,
    "QueryInvalidMinfreqError": QueryInvalidMinfreqError,
    "QueryExceededMaxNumberQuerysError": QueryExceededMaxNumberQuerysError,
    "QueryInvalidOperatorUsageError": QueryInvalidOperatorUsageError,
    "QueryInvalidParameterUsageError": QueryInvalidParameterUsageError,
    "QueryParameterInvalidColumnUsageError": QueryParameterInvalidColumnUsageError,
    "QueryInvalidColumnUsageError": QueryInvalidColumnUsageError,
    "ColumnCreateInternalError": ColumnCreateInternalError,
    // Client errors
    "SlicingDiceClientError": SlicingDiceClientError,
    "InvalidQueryTypeError": InvalidQueryTypeError,
    "MaxLimitError": MaxLimitError,
    "InvalidQueryError": InvalidQueryError,
    "InvalidColumnDescriptionError": InvalidColumnDescriptionError,
    "WrongTypeError": WrongTypeError,
    "InvalidColumnError": InvalidColumnError,
    "InvalidColumnTypeError": InvalidColumnTypeError,
    "InvalidKeyError": InvalidKeyError,
    "InvalidMethodRequestError": InvalidMethodRequestError,
    "InsertInvalidRangeException": InsertInvalidRangeException
}