const errorHandler = (err, req, res, next) => {
  const errorDetails = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  console.log(errorDetails);
  console.error(err.stack);
  console.log("errrrrrrrrr\n\n\n\n\n\n\n\n\n\n\rrrrrrrrrrror");
  const status = res.statusCode ? res.statusCode : 500; // server error
  res.status(status).json({ message: err.message });
  next();
};

module.exports = errorHandler;
