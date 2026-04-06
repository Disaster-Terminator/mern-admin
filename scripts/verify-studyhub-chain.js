require("dotenv").config({ path: __dirname + "/../.variables.env" });

const apiBase =
  process.env.STUDYHUB_API_BASE ||
  `http://localhost:${process.env.PORT || 8888}/api`;

const demoEmail = process.env.DEMO_ADMIN_EMAIL || "admin@demo.com";
const demoPassword = process.env.DEMO_ADMIN_PASSWORD || "123456";

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const request = async ({ path, method = "GET", token, body }) => {
  const response = await fetch(`${apiBase}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "x-auth-token": token } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};

const run = async () => {
  const temp = {
    courseId: null,
    taskId: null,
    noteId: null,
    reviewPlanId: null,
  };

  try {
    const loginResponse = await request({
      path: "login",
      method: "POST",
      body: {
        email: demoEmail,
        password: demoPassword,
      },
    });

    assert(
      loginResponse.data && loginResponse.data.success === true,
      `登录失败：${
        (loginResponse.data && loginResponse.data.message) || loginResponse.status
      }`
    );

    const token =
      loginResponse.data &&
      loginResponse.data.result &&
      loginResponse.data.result.token;

    assert(token, "登录成功但未返回 token");

    const stamp = Date.now();
    const verifyCourseName = `验证课程-${stamp}`;

    const createCourse = await request({
      path: "course/create",
      method: "POST",
      token,
      body: {
        name: verifyCourseName,
        teacher: "验证教师",
        location: "实验楼 101",
        weekday: "周日",
        remark: "自动化链路验证数据",
      },
    });

    assert(createCourse.data.success === true, "课程创建失败");
    temp.courseId = createCourse.data.result && createCourse.data.result._id;

    const createTask = await request({
      path: "task/create",
      method: "POST",
      token,
      body: {
        title: `验证任务-${stamp}`,
        course: verifyCourseName,
        dueDate: "2026-04-30",
        priority: "medium",
        status: "pending",
        remark: "自动化验证任务",
      },
    });

    assert(createTask.data.success === true, "任务创建失败");
    temp.taskId = createTask.data.result && createTask.data.result._id;

    const toggleTask = await request({
      path: `task/toggle-status/${temp.taskId}`,
      method: "PATCH",
      token,
      body: {},
    });

    assert(toggleTask.data.success === true, "任务状态切换失败");

    const createNote = await request({
      path: "note/create",
      method: "POST",
      token,
      body: {
        title: `验证笔记-${stamp}`,
        course: verifyCourseName,
        content: "用于自动化验证主链路的笔记内容。",
        tags: "验证,自动化",
      },
    });

    assert(createNote.data.success === true, "笔记创建失败");
    temp.noteId = createNote.data.result && createNote.data.result._id;

    const createReviewPlan = await request({
      path: "reviewplan/create",
      method: "POST",
      token,
      body: {
        course: verifyCourseName,
        reviewDate: "2026-05-01",
        target: "验证复习计划写入",
        status: "pending",
        remark: "自动化验证",
      },
    });

    assert(createReviewPlan.data.success === true, "复习计划创建失败");
    temp.reviewPlanId = createReviewPlan.data.result && createReviewPlan.data.result._id;

    const [courseList, taskList, noteList, reviewPlanList] = await Promise.all([
      request({ path: "course/list", token }),
      request({ path: "task/list", token }),
      request({ path: "note/list", token }),
      request({ path: "reviewplan/list", token }),
    ]);

    assert(courseList.data.success === true, "课程列表读取失败");
    assert(taskList.data.success === true, "任务列表读取失败");
    assert(noteList.data.success === true, "笔记列表读取失败");
    assert(reviewPlanList.data.success === true, "复习计划列表读取失败");

    const aiAssistant = await request({
      path: "studyhub/ai-assistant",
      method: "POST",
      token,
      body: {
        course: verifyCourseName,
        taskDescription: "验证 AI 助手请求链路",
        noteContent: "验证笔记摘要链路",
        actionType: "综合建议",
      },
    });

    assert(aiAssistant.data.success === true, "AI 助手调用失败");

    const aiLogs = await request({ path: "ai-log/list", token });
    assert(aiLogs.data.success === true, "AI 日志列表读取失败");

    const aiLogItems = (aiLogs.data.result || []).filter(
      (item) => item.course === verifyCourseName
    );
    assert(aiLogItems.length > 0, "AI 助手调用后未检测到 ai_logs 写入");

    const statistics = await request({ path: "studyhub/statistics", token });
    assert(statistics.data.success === true, "统计接口读取失败");

    const overview = statistics.data.result && statistics.data.result.overview;
    assert(overview, "统计接口未返回 overview");
    assert(overview.tasksCount >= 1, "统计数据异常：tasksCount < 1");
    assert(
      Array.isArray(statistics.data.result.tasksByCourse),
      "统计数据异常：tasksByCourse 非数组"
    );
    assert(
      Array.isArray(statistics.data.result.tasksByStatus),
      "统计数据异常：tasksByStatus 非数组"
    );

    console.log("[verify] PASS");
    console.log(`[verify] API Base: ${apiBase}`);
    console.log("[verify] 登录、课程、任务、笔记、复习计划、统计、AI 与 ai_logs 主链路验证通过");
    console.log(
      `[verify] AI 配置状态: ${
        aiAssistant.data.result && aiAssistant.data.result.configured === false
          ? "未配置 key（已走友好返回）"
          : "已配置 key（已返回模型结果）"
      }`
    );
  } catch (error) {
    console.error("[verify] FAIL:", error.message);
    process.exitCode = 1;
  } finally {
    const loginAgain = await request({
      path: "login",
      method: "POST",
      body: {
        email: demoEmail,
        password: demoPassword,
      },
    });

    const token =
      loginAgain.data &&
      loginAgain.data.result &&
      loginAgain.data.result.token;

    if (token) {
      const cleanupOps = [
        temp.reviewPlanId && request({ path: `reviewplan/delete/${temp.reviewPlanId}`, method: "DELETE", token }),
        temp.noteId && request({ path: `note/delete/${temp.noteId}`, method: "DELETE", token }),
        temp.taskId && request({ path: `task/delete/${temp.taskId}`, method: "DELETE", token }),
        temp.courseId && request({ path: `course/delete/${temp.courseId}`, method: "DELETE", token }),
      ].filter(Boolean);

      await Promise.all(cleanupOps).catch(() => null);
      await request({ path: "logout", method: "POST", token }).catch(() => null);
    }
  }
};

run();
