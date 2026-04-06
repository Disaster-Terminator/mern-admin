const mongoose = require("mongoose");
const methods = require("./crudController");

const Task = mongoose.model("Task");
const controller = methods.crudController("Task");

controller.toggleStatus = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "未找到对应任务",
      });
    }

    task.status = task.status === "completed" ? "pending" : "completed";
    const result = await task.save();

    return res.status(200).json({
      success: true,
      result,
      message: "任务状态切换成功",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "任务状态切换失败",
    });
  }
};

module.exports = controller;
