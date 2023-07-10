const dotenv = require("dotenv").config();
const database = require("./database/index").database;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const createError = require("http-errors");
const auth = require("./middlewares/auth.middleware");
const rateLimit = require("express-rate-limit");
// const middlewares = require("./middlewares");

const routes = require("./routes");
const { logger } = require("./utils/logger");

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15, // Limit each IP to 15 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

console.log(
  `******** Application started in ${process.env.NODE_ENV} mode ********`
);

// routes
app.use("/api/v1", routes);
app.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "Server is running",
  });
});

app.all("*", (req, res, next) => {
  return next(
    createError.NotFound(`Can't find ${req.originalUrl} on this server!`)
  );
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server up on " + process.env.PORT);
  database.connectionTest();
});
