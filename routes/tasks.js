const express = require("express");

const router = express.Router();

const Task = require("../models/task.models");

router.get("/", function(req, res, next) {
  Task.find().then(result => {
    res.json(result);
  });
});

router.post("/add", function(req, res, next) {
  const { description, date } = req.body;
  const task = new Task({
    description,
    date,
    done: false,
  });
  task.save().then(result => res.redirect("/"));
});

router.post("/remove", function(req, res, next) {
  const { id } = req.body;
  Task.findById(id, (err, result) => {
    result.remove();
    res.redirect("/");
  });
});

router.post("/done", function(req, res, next) {
  const { id } = req.body;
  Task.findById(id, (err, result) => {
    result.done = !result.done;
    result.save().then(() => res.json({ status: "success" }));
  });
});

module.exports = router;
