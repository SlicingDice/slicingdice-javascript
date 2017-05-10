class ExtendableError extends Error {
  constructor(data) {
    let message = '';
    if (data.code) {
      message += 'code=' + data.code + ' ';
    }
    if (data.message) {
      message += 'message="' + data.message + '" ';
    }
    if (data.more_info) {
      message += 'more_info="' + JSON.stringify(data.more_info) + '" ';
    }

    super(message);

    this.code = data.code;
    this.more_info = data.more_info; 

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else { 
      this.stack = (new Error(data.message)).stack; 
    }
  }
}

class SlicingDiceError extends ExtendableError {
  constructor(data) {   
    super(data);
  }
}

class SlicingDiceClientError extends ExtendableError {
  constructor(data) {   
    super(data);
  }
}

// Specific Errors

class DemoUnavailableException extends SlicingDiceError {
  constructor(data) {   
    super(data);
  }
}

class RequestRateLimitException extends SlicingDiceError {
  constructor(data) {   
    super(data);
  }
}

class RequestBodySizeExceededException extends SlicingDiceError {
  constructor(data) {   
    super(data);
  }
}

class IndexEntitiesLimitException extends SlicingDiceError {
  constructor(data) {   
    super(data);
  }
}

class IndexColumnsLimitException extends SlicingDiceError {
  constructor(data) {   
    super(data);
  }
}



module.exports = {
    "SlicingDiceError": SlicingDiceError,
    "SlicingDiceClientError": SlicingDiceClientError,
    "DemoUnavailableException": DemoUnavailableException,
    "RequestRateLimitException": RequestRateLimitException,
    "RequestBodySizeExceededException": RequestBodySizeExceededException,
    "IndexEntitiesLimitException": IndexEntitiesLimitException,
    "IndexColumnsLimitException": IndexColumnsLimitException,
}