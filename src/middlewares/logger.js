/**
 * Middleware to log request details and response status
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const LoggerMiddleware = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`[${timeStamp}] ${req.method} ${req.url} - IP: ${req.ip}`);

  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${timeStamp}] ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`
    );
  });

  next();
};

module.exports = LoggerMiddleware;
