const globalErrorHanadler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: err.stack,
  });
};

const NotFoundHandler = (req, res, next) => {
  const err = new Error(`NO Router ${req.originalUrl} Found`);
  res.status(404);
  return res.send("This Router Is Not Exists ");
};

module.exports = { globalErrorHanadler, NotFoundHandler };
