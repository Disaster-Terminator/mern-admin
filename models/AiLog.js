const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const aiLogSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      trim: true,
      default: "",
    },
    taskDescription: {
      type: String,
      trim: true,
      default: "",
    },
    noteContent: {
      type: String,
      trim: true,
      default: "",
    },
    actionType: {
      type: String,
      trim: true,
      default: "combined",
    },
    requestSummary: {
      type: String,
      trim: true,
      default: "",
    },
    responseText: {
      type: String,
      trim: true,
      default: "",
    },
    errorMessage: {
      type: String,
      trim: true,
      default: "",
    },
    model: {
      type: String,
      trim: true,
      default: "",
    },
    configured: {
      type: Boolean,
      default: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "ai_logs",
  }
);

module.exports = mongoose.model("AiLog", aiLogSchema);
