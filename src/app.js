const loggerMiddleware = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");
const express = require("express");
const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use("/api", routes);
app.use(errorHandler);


app.get("/", (_, res) => res.send("Hello World!"));

module.exports = app;
