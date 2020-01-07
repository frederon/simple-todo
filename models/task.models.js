const mongoose = require("mongoose");

const { Schema } = mongoose;

const Task = new Schema({
  description: String,
  date: Date,
  done: Boolean,
});

module.exports = mongoose.model("Tasks", Task);
