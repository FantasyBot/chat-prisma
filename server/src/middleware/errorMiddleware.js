const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 || res.statusCode === 201 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message ? err.message : err.msg,
    stack: err.stack ? err.stack : null,
  });
};

module.exports = { notFound, errorHandler };
