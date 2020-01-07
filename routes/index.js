const express = require("express");
const axios = require("axios");
const config = require("../config");

const router = express.Router();

router.get("/", function(req, res, next) {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let tasks;
  axios.get(`${config.url}/tasks`).then(result => {
    tasks = result.data;
    res.render("index", {
      today: {
        raw: new Date().toISOString().substring(0, 10),
        formatted: new Date().toLocaleDateString("en-US", dateOptions),
      },
      tasks,
    });
  });
});

module.exports = router;
