const mongoose = require("mongoose");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const tasksRouter = require("./routes/tasks");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { connection } = mongoose;

connection.once("open", function() {
  console.log("MongoDB connected.");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/tasks", tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error", {
    today: {
      raw: new Date().toISOString().substring(0, 10),
      formatted: new Date().toLocaleDateString("en-US", dateOptions),
    },
  });
});

module.exports = app;
