const globalErrorHanadler = (err, req, res, next) => {
  const stack = err.stack;
  const message = err.message;
  const status = err.status;
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json(status, message, stack);
};

const NotFoundHandler = (req, res, next) => {
  const err = new Error(`NO Router ${req.originalUrl} Found`);
  res.status(404);
  next(err);
};

module.exports = { globalErrorHanadler, NotFoundHandler };
