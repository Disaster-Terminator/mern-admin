const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const normalizeTags = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => `${item}`.trim())
      .filter((item) => item.length > 0);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [];
};

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  course: {
    type: String,
    trim: true,
    default: "",
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
    set: normalizeTags,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
