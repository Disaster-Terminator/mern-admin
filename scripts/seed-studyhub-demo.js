require("dotenv").config({ path: __dirname + "/../.variables.env" });

const mongoose = require("mongoose");
const { resolveDatabaseConfig, maskMongoUri } = require("../config/database");

require("../models/Course");
require("../models/Task");
require("../models/Note");
require("../models/ReviewPlan");
require("../models/AiLog");

const Course = mongoose.model("Course");
const Task = mongoose.model("Task");
const Note = mongoose.model("Note");
const ReviewPlan = mongoose.model("ReviewPlan");
const AiLog = mongoose.model("AiLog");

const courses = [
  {
    name: "软件工程",
    teacher: "刘晓峰",
    location: "A301",
    weekday: "周一",
    remark: "课程项目：校园学习系统需求与实现",
  },
  {
    name: "数据结构",
    teacher: "陈明",
    location: "B204",
    weekday: "周二",
    remark: "重点：图、堆、哈希与复杂度分析",
  },
  {
    name: "操作系统",
    teacher: "王楠",
    location: "A208",
    weekday: "周三",
    remark: "关注进程调度与内存管理",
  },
  {
    name: "计算机网络",
    teacher: "赵静",
    location: "C105",
    weekday: "周四",
    remark: "实验课包含抓包与协议分析",
  },
  {
    name: "数据库原理",
    teacher: "张倩",
    location: "B110",
    weekday: "周五",
    remark: "课程设计使用 MongoDB 与 SQL 对比",
  },
  {
    name: "人工智能导论",
    teacher: "孙博",
    location: "A402",
    weekday: "周六",
    remark: "结合学习日志完成个性化复盘",
  },
];

const tasks = [
  {
    title: "完成软件工程需求规格说明书初稿",
    course: "软件工程",
    dueDate: "2026-04-12",
    priority: "high",
    status: "pending",
    remark: "至少包含业务流程图、用例图、关键约束",
  },
  {
    title: "补充软件工程原型评审记录",
    course: "软件工程",
    dueDate: "2026-04-09",
    priority: "medium",
    status: "completed",
    remark: "整理课堂反馈并更新迭代计划",
  },
  {
    title: "刷题：二叉树与堆（8 题）",
    course: "数据结构",
    dueDate: "2026-04-10",
    priority: "high",
    status: "pending",
    remark: "每题记录思路和时间复杂度",
  },
  {
    title: "整理图最短路算法对比笔记",
    course: "数据结构",
    dueDate: "2026-04-08",
    priority: "medium",
    status: "completed",
    remark: "Dijkstra / Bellman-Ford / Floyd",
  },
  {
    title: "完成操作系统线程同步实验",
    course: "操作系统",
    dueDate: "2026-04-11",
    priority: "high",
    status: "pending",
    remark: "重点验证死锁避免策略",
  },
  {
    title: "复盘进程调度算法课堂作业",
    course: "操作系统",
    dueDate: "2026-04-07",
    priority: "low",
    status: "completed",
    remark: "比较 FCFS/SJF/RR 实际等待时间",
  },
  {
    title: "网络分层模型知识图谱整理",
    course: "计算机网络",
    dueDate: "2026-04-12",
    priority: "medium",
    status: "pending",
    remark: "补充 TCP 三次握手与拥塞控制",
  },
  {
    title: "抓包实验报告提交",
    course: "计算机网络",
    dueDate: "2026-04-06",
    priority: "high",
    status: "completed",
    remark: "附关键报文截图并解释字段",
  },
  {
    title: "数据库范式练习（第一到第三范式）",
    course: "数据库原理",
    dueDate: "2026-04-13",
    priority: "medium",
    status: "pending",
    remark: "每题补充函数依赖说明",
  },
  {
    title: "MongoDB 索引优化实验",
    course: "数据库原理",
    dueDate: "2026-04-09",
    priority: "high",
    status: "completed",
    remark: "记录 explain 输出与性能对比",
  },
  {
    title: "整理 AI 模型评估指标卡片",
    course: "人工智能导论",
    dueDate: "2026-04-14",
    priority: "low",
    status: "pending",
    remark: "覆盖 Precision/Recall/F1 与混淆矩阵",
  },
  {
    title: "完成课程论文开题提纲",
    course: "人工智能导论",
    dueDate: "2026-04-10",
    priority: "medium",
    status: "completed",
    remark: "明确研究问题与实验计划",
  },
];

const notes = [
  {
    title: "软件工程需求分析要点",
    course: "软件工程",
    content: "需求分析阶段优先澄清功能边界、角色目标和验收标准，避免开发后期返工。",
    tags: ["需求分析", "验收标准", "项目管理"],
  },
  {
    title: "用例图绘制规范",
    course: "软件工程",
    content: "用例图要聚焦用户目标，不把实现细节放入用例描述。",
    tags: ["UML", "用例图", "建模"],
  },
  {
    title: "堆与优先队列知识整理",
    course: "数据结构",
    content: "二叉堆插入与删除的复杂度为 O(log n)，适合实时维护 TopK。",
    tags: ["二叉堆", "优先队列", "复杂度"],
  },
  {
    title: "最短路算法选择建议",
    course: "数据结构",
    content: "边权非负优先 Dijkstra，存在负边权考虑 Bellman-Ford。",
    tags: ["图论", "最短路", "算法选择"],
  },
  {
    title: "线程同步核心概念",
    course: "操作系统",
    content: "临界区保护可通过互斥锁、信号量和条件变量实现。",
    tags: ["线程", "同步", "并发"],
  },
  {
    title: "TCP 拥塞控制阶段",
    course: "计算机网络",
    content: "慢启动、拥塞避免、快重传、快恢复四个阶段要结合窗口变化理解。",
    tags: ["TCP", "拥塞控制", "网络协议"],
  },
  {
    title: "数据库索引设计经验",
    course: "数据库原理",
    content: "高选择性字段适合作为索引前缀，同时关注写入放大带来的成本。",
    tags: ["索引", "查询优化", "MongoDB"],
  },
  {
    title: "模型评估指标速记",
    course: "人工智能导论",
    content: "分类任务中仅看准确率可能误导，需结合召回率和 F1 分析。",
    tags: ["机器学习", "评估指标", "F1"],
  },
];

const reviewPlans = [
  {
    course: "软件工程",
    reviewDate: "2026-04-15",
    target: "复盘需求建模与用户故事拆分",
    status: "pending",
    remark: "输出 1 份需求检查清单",
  },
  {
    course: "数据结构",
    reviewDate: "2026-04-16",
    target: "完成树与图章节真题回顾",
    status: "completed",
    remark: "完成错题重做并记录题解",
  },
  {
    course: "操作系统",
    reviewDate: "2026-04-17",
    target: "复习进程通信与同步机制",
    status: "pending",
    remark: "绘制线程状态转换图",
  },
  {
    course: "计算机网络",
    reviewDate: "2026-04-18",
    target: "梳理传输层协议对比",
    status: "completed",
    remark: "重点理解 TCP 与 UDP 场景",
  },
  {
    course: "数据库原理",
    reviewDate: "2026-04-19",
    target: "复习事务、并发控制与索引",
    status: "pending",
    remark: "补做两道事务隔离级别题",
  },
  {
    course: "人工智能导论",
    reviewDate: "2026-04-20",
    target: "回顾模型评估与过拟合处理",
    status: "completed",
    remark: "整理课堂案例到一页笔记",
  },
];

const aiLogs = [
  {
    course: "软件工程",
    taskDescription: "本周需要完成需求规格说明书并安排小组分工",
    noteContent: "已有用户故事与原型草图，需要拆解里程碑",
    actionType: "任务拆分",
    requestSummary: "课程：软件工程 | 模式：任务拆分",
    responseText: "建议将任务分为需求确认、文档撰写、评审修订三阶段，每阶段设定负责人和截止时间。",
    model: "gpt-4o-mini",
    configured: true,
  },
  {
    course: "数据结构",
    taskDescription: "准备下周算法测验，题量较大",
    noteContent: "错题集中在图算法和堆",
    actionType: "学习建议",
    requestSummary: "课程：数据结构 | 模式：学习建议",
    responseText: "每天 60 分钟分组刷题：30 分钟图算法 + 20 分钟堆结构 + 10 分钟复盘总结。",
    model: "gpt-4o-mini",
    configured: true,
  },
  {
    course: "人工智能导论",
    taskDescription: "希望把课堂笔记整理成复习提纲",
    noteContent: "未配置 OpenAI key 的备用演示记录",
    actionType: "笔记摘要",
    requestSummary: "课程：人工智能导论 | 模式：笔记摘要",
    responseText: "",
    errorMessage: "OPENAI_API_KEY 未配置，AI 助手暂不可用。",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    configured: false,
  },
];

const connectDatabase = async () => {
  const databaseConfig = resolveDatabaseConfig();
  await mongoose.connect(databaseConfig.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    `[seed] Connected (${databaseConfig.source}) -> ${maskMongoUri(
      databaseConfig.mongoUri
    )}`
  );
};

const run = async () => {
  try {
    await connectDatabase();

    await Promise.all([
      Course.deleteMany({}),
      Task.deleteMany({}),
      Note.deleteMany({}),
      ReviewPlan.deleteMany({}),
      AiLog.deleteMany({}),
    ]);

    await Promise.all([
      Course.insertMany(courses),
      Task.insertMany(tasks),
      Note.insertMany(notes),
      ReviewPlan.insertMany(reviewPlans),
      AiLog.insertMany(aiLogs),
    ]);

    console.log("[seed] StudyHub demo data prepared successfully.");
    console.log(
      `[seed] courses=${courses.length}, tasks=${tasks.length}, notes=${notes.length}, reviewPlans=${reviewPlans.length}, aiLogs=${aiLogs.length}`
    );
  } catch (error) {
    console.error("[seed] Failed to seed demo data:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();
