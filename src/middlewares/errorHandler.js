const isDevelopment = process.env.NODE_ENV === "development";


/**
 * Middleware para manejar errores de forma centralizada
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[${new Date().toISOString()}] - Error: ${message} - StatusCode: ${statusCode}`);

  if (err.stack) console.error(err.stack);

  res.status(statusCode).json({
    message,
    statusCode,
    status: "error",
    ...(isDevelopment && { stack: err.stack }),
  });
};

module.exports = errorHandler;