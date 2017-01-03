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

class CustomkeyInvalidFieldCreationError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class CustomKeyInvalidPermissionForFieldError extends SlicingDiceError {
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

class RequestExceedLimitError extends SlicingDiceError {
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

// FIELD ERRORS
class FieldMissingParamError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldIntegerValuesError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldAlreadyExistsError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldTimeSeriesLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldTimeSeriesSystemLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldDecimalTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldStorageValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldInvalidApiNameError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldInvalidNameError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldInvalidDescriptionError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldExceedDescriptionlengthError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldInvalidCardinalityError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldDecimalLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldRangeLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldExceededMaxNameLenghtError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldExceededMaxApiNameLenghtError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldEmptyEntityIdError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class FieldExceededPermitedValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

// INDEX ERRORS
class IndexInvalidDecimalPlacesError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexEntityValueTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexFieldNameTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexFieldTypeError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexEntityNameTooBigError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexFieldValueTooBigError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexTimeSeriesDateFormatError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexFieldNotActiveError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexFieldLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexDateFormatError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

class IndexIdLimitError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexFieldStringEmptyValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexFieldTimeseriesInvalidParameterError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexFieldNumericInvalidValueError extends SlicingDiceError {
  constructor(m) {   
    super(m);
  }
}

class IndexFieldTimeseriesMissingValueError extends SlicingDiceError {
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

class QueryFieldLimitError extends SlicingDiceError {
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

class QueryFieldNotActiveError extends SlicingDiceError {
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

class QueryDataExtractionFieldLimitError extends SlicingDiceError {
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

class QueryParameterInvalidFieldUsageError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}

class QueryInvalidFieldUsageError extends SlicingDiceError {
    constructor(m) {
        super(m);
    }
}


class FieldCreateInternalError extends ExtendableError {
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

class InvalidFieldDescriptionError extends ExtendableError {
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

class InvalidFieldError extends ExtendableError {
  constructor(m) {   
    super(m);
  }
}

class InvalidFieldTypeError extends ExtendableError {
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

module.exports = {
    "AuthMissingHeaderError" : AuthMissingHeaderError,
    "AuthAPIKeyError": AuthAPIKeyError,
    "AuthInvalidAPIKeyError": AuthInvalidAPIKeyError,
    "AuthIncorrectPermissionError": AuthIncorrectPermissionError,
    "AuthInvalidRemoteAddrError": AuthInvalidRemoteAddrError,
    "CustomKeyInvalidFieldCreationError": CustomkeyInvalidFieldCreationError,
    "CustomKeyInvalidPermissionForFieldError": CustomKeyInvalidPermissionForFieldError,
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
    "RequestExceedLimitError": RequestExceedLimitError,
    // Account Errors (30 - 39)
    "AccountMissingPaymentMethodError": AccountMissingPaymentMethodError,
    "AccountPaymentRequiredError": AccountPaymentRequiredError,
    "AccountBannedError": AccountBannedError,
    "AccountDisabledError": AccountDisabledError,
    // Field errors (40 - 59)
    "FieldMissingParamError": FieldMissingParamError,
    "FieldTypeError": FieldTypeError,
    "FieldIntegerValuesError": FieldIntegerValuesError,
    "FieldAlreadyExistsError": FieldAlreadyExistsError,
    "FieldLimitError": FieldLimitError,
    "FieldTimeSeriesLimitError": FieldTimeSeriesLimitError,
    "FieldTimeSeriesSystemLimitError": FieldTimeSeriesSystemLimitError,
    "FieldDecimalTypeError": FieldDecimalTypeError,
    "FieldStorageValueError": FieldStorageValueError,
    "FieldInvalidApiNameError": FieldInvalidApiNameError,
    "FieldInvalidNameError": FieldInvalidNameError,
    "FieldInvalidDescriptionError": FieldInvalidDescriptionError,
    "FieldExceedDescriptionlengthError": FieldExceedDescriptionlengthError,
    "FieldInvalidCardinalityError": FieldInvalidCardinalityError,
    "FieldDecimalLimitError": FieldDecimalLimitError,
    "FieldRangeLimitError": FieldRangeLimitError,
    "FieldExceededMaxNameLenghtError": FieldExceededMaxNameLenghtError,
    "FieldExceededMaxApiNameLenghtError": FieldExceededMaxApiNameLenghtError,
    "FieldEmptyEntityIdError": FieldEmptyEntityIdError,
    "FieldExceededPermitedValueError": FieldExceededPermitedValueError,
    // Index errors (60 - 79)
    "IndexInvalidDecimalPlacesError": IndexInvalidDecimalPlacesError,
    "IndexEntityValueTypeError": IndexEntityValueTypeError,
    "IndexFieldNameTypeError": IndexFieldNameTypeError,
    "IndexFieldTypeError": IndexFieldTypeError,
    "IndexEntityNameTooBigError": IndexEntityNameTooBigError,
    "IndexFieldValueTooBigError": IndexFieldValueTooBigError,
    "IndexTimeSeriesDateFormatError": IndexTimeSeriesDateFormatError,
    "IndexFieldNotActiveError": IndexFieldNotActiveError,
    "IndexIdLimitError": IndexIdLimitError,
    "IndexFieldLimitError": IndexFieldLimitError,
    "IndexDateFormatError": IndexDateFormatError,
    "IndexFieldStringEmptyValueError": IndexFieldStringEmptyValueError,
    "IndexFieldTimeseriesInvalidParameterError": IndexFieldTimeseriesInvalidParameterError,
    "IndexFieldNumericInvalidValueError": IndexFieldNumericInvalidValueError,
    "IndexFieldTimeseriesMissingValueError": IndexFieldTimeseriesMissingValueError,
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
    "QueryFieldNotActiveError": QueryFieldNotActiveError,
    "QueryMissingOperatorError": QueryMissingOperatorError,
    "QueryIncompleteError": QueryIncompleteError,
    "QueryEventCountQueryError": QueryEventCountQueryError,
    "QueryInvalidMetricError": QueryInvalidMetricError,
    "QueryIntegerError": QueryIntegerError,
    "QueryFieldLimitError": QueryFieldLimitError,
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
    "QueryDataExtractionFieldLimitError": QueryDataExtractionFieldLimitError,
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
    "QueryParameterInvalidFieldUsageError": QueryParameterInvalidFieldUsageError,
    "QueryInvalidFieldUsageError": QueryInvalidFieldUsageError,
    "FieldCreateInternalError": FieldCreateInternalError,
    // Client errors
    "SlicingDiceClientError": SlicingDiceClientError,
    "InvalidQueryTypeError": InvalidQueryTypeError,
    "MaxLimitError": MaxLimitError,
    "InvalidQueryError": InvalidQueryError,
    "InvalidFieldDescriptionError": InvalidFieldDescriptionError,
    "WrongTypeError": WrongTypeError,
    "InvalidFieldError": InvalidFieldError,
    "InvalidFieldTypeError": InvalidFieldTypeError,
    "InvalidKeyError": InvalidKeyError,
    "InvalidMethodRequestError": InvalidMethodRequestError
}