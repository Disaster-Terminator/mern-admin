const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  teacher: {
    type: String,
    trim: true,
    default: "",
  },
  location: {
    type: String,
    trim: true,
    default: "",
  },
  weekday: {
    type: String,
    trim: true,
    default: "",
  },
  remark: {
    type: String,
    trim: true,
    default: "",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
