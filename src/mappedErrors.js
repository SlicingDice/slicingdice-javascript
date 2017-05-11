var errors = require('./errors');

var mappedSDErrors = {
    2: errors['DemoUnavailableError'],
    1502: errors['RequestRateLimitError'],
    1507: errors['RequestBodySizeExceededError'],
    2012: errors['IndexEntitiesLimitError'],
    2013: errors['IndexColumnsLimitError'],
}

module.exports = mappedSDErrors;
