var errors = require('./errors');

var mappedSDErrors = {
    2: errors['DemoUnavailableException'],
    1502: errors['RequestRateLimitException'],
    1507: errors['RequestBodySizeExceededException'],
    2012: errors['IndexEntitiesLimitException'],
    2013: errors['IndexColumnsLimitException'],
}

module.exports = mappedSDErrors;
