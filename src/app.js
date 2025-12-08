const loggerMiddleware = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");
const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use(loggerMiddleware);
app.use(errorHandler);

app.use("/api", routes);

app.get("/", (_, res) => res.send("Hello World!"));

module.exports = app;
