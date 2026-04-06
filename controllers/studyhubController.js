const mongoose = require("mongoose");
const { askStudyAssistant } = require("../services/openaiService");

const Course = mongoose.model("Course");
const Task = mongoose.model("Task");
const Note = mongoose.model("Note");
const AiLog = mongoose.model("AiLog");

const summarize = (text, max = 280) => {
  const value = `${text || ""}`.replace(/\s+/g, " ").trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max)}...`;
};

exports.statistics = async (req, res) => {
  try {
    const [
      coursesCount,
      tasksCount,
      completedTasksCount,
      notesCount,
      aiUsageCount,
      tasksByCourse,
      notesByCourse,
      tasksByStatus,
    ] = await Promise.all([
      Course.countDocuments(),
      Task.countDocuments(),
      Task.countDocuments({ status: "completed" }),
      Note.countDocuments(),
      AiLog.countDocuments(),
      Task.aggregate([
        {
          $group: {
            _id: { $ifNull: ["$course", "未关联课程"] },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Note.aggregate([
        {
          $group: {
            _id: { $ifNull: ["$course", "未关联课程"] },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Task.aggregate([
        {
          $group: {
            _id: { $ifNull: ["$status", "pending"] },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    return res.status(200).json({
      success: true,
      result: {
        overview: {
          coursesCount,
          tasksCount,
          completedTasksCount,
          notesCount,
          aiUsageCount,
        },
        tasksByCourse,
        notesByCourse,
        tasksByStatus,
      },
      message: "统计数据获取成功",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "统计数据获取失败",
    });
  }
};

exports.aiAssistant = async (req, res) => {
  const payload = req.body || {};
  const actionType = payload.actionType || "综合建议";

  const requestSummary = [
    `课程：${payload.course || "未提供"}`,
    `任务：${summarize(payload.taskDescription, 100) || "未提供"}`,
    `笔记：${summarize(payload.noteContent, 100) || "未提供"}`,
    `模式：${actionType}`,
  ].join(" | ");

  try {
    const aiResult = await askStudyAssistant({
      course: payload.course,
      taskDescription: payload.taskDescription,
      noteContent: payload.noteContent,
      actionType,
    });

    await new AiLog({
      course: payload.course,
      taskDescription: payload.taskDescription,
      noteContent: payload.noteContent,
      actionType,
      requestSummary,
      responseText: aiResult.output,
      model: aiResult.model,
      configured: aiResult.configured,
    }).save();

    return res.status(200).json({
      success: true,
      result: {
        configured: aiResult.configured,
        output: aiResult.output,
        model: aiResult.model,
        message: aiResult.message,
      },
      message: aiResult.message,
    });
  } catch (error) {
    await new AiLog({
      course: payload.course,
      taskDescription: payload.taskDescription,
      noteContent: payload.noteContent,
      actionType,
      requestSummary,
      responseText: "",
      errorMessage: error.message,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      configured: true,
    }).save();

    return res.status(500).json({
      success: false,
      result: null,
      message: `AI 调用失败：${error.message}`,
    });
  }
};
