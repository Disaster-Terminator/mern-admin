const http = require("http");
const https = require("https");

const defaultBaseUrl = "https://api.openai.com/v1";

const parseMessageContent = (content) => {
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item.text === "string") return item.text;
        return "";
      })
      .join("\n")
      .trim();
  }

  return "";
};

const requestJson = (urlString, payload, headers = {}) =>
  new Promise((resolve, reject) => {
    const endpoint = new URL(urlString);
    const body = JSON.stringify(payload);
    const requestModule = endpoint.protocol === "https:" ? https : http;

    const req = requestModule.request(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          ...headers,
        },
      },
      (res) => {
        const chunks = [];

        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const responseText = Buffer.concat(chunks).toString("utf8");
          let responseData = {};

          try {
            responseData = responseText ? JSON.parse(responseText) : {};
          } catch (error) {
            return reject(new Error("AI 服务返回了无法解析的响应"));
          }

          if (res.statusCode >= 200 && res.statusCode < 300) {
            return resolve(responseData);
          }

          const errorMessage =
            (responseData.error && responseData.error.message) ||
            `AI 服务请求失败（${res.statusCode}）`;
          return reject(new Error(errorMessage));
        });
      }
    );

    req.on("error", (error) => reject(error));
    req.write(body);
    req.end();
  });

exports.askStudyAssistant = async ({
  course,
  taskDescription,
  noteContent,
  actionType,
}) => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      configured: false,
      output: "",
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      message: "OPENAI_API_KEY 未配置，AI 助手暂不可用。",
    };
  }

  const baseUrl = process.env.OPENAI_BASE_URL || defaultBaseUrl;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const endpoint = new URL(
    "chat/completions",
    baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
  ).toString();

  const prompt = [
    `课程名：${course || "未提供"}`,
    `任务描述：${taskDescription || "未提供"}`,
    `笔记内容：${noteContent || "未提供"}`,
    `期望输出：${actionType || "综合建议"}`,
  ].join("\n");

  const response = await requestJson(
    endpoint,
    {
      model,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "你是 StudyHub 智能学习助手。请输出简洁、可执行的学习建议，优先给出任务拆分、时间安排和风险提醒。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      Authorization: `Bearer ${apiKey}`,
    }
  );

  const output = parseMessageContent(
    response &&
      response.choices &&
      response.choices[0] &&
      response.choices[0].message &&
      response.choices[0].message.content
  );

  return {
    configured: true,
    output: output || "AI 未返回有效内容，请稍后重试。",
    model,
    message: "AI 助手生成成功",
  };
};
