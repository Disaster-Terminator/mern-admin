const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const reviewPlanSchema = new mongoose.Schema({
  course: {
    type: String,
    trim: true,
    required: true,
  },
  reviewDate: {
    type: String,
    trim: true,
    default: "",
  },
  target: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
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

module.exports = mongoose.model("ReviewPlan", reviewPlanSchema);
