class HttpError extends Error {
  static get code() { return 500; }

  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends HttpError {
  static get code() { return 400; }
}

class UnauthorizedError extends HttpError {
  static get code() { return 401; }
}

class ForbiddenError extends HttpError {
  static get code() { return 403; }
}

class NotFoundError extends HttpError {
  static get code() { return 404; }
}

class ConflictError extends HttpError {
  static get code() { return 409; }
}

class InternalServerError extends HttpError {
  static get code() { return 500; }
}

module.exports = {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
