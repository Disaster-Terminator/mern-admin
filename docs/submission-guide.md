# StudyHub 智能学习任务管理系统补交说明

## 1. 项目名称与简介

StudyHub 是一个面向学生学习场景的任务管理与复盘系统，支持课程管理、学习任务、学习笔记、复习计划、统计分析和 AI 学习助手，覆盖从日常记录到阶段复盘的完整链路。

## 2. 功能模块说明

- 登录模块：管理员账号登录与会话鉴权。
- 首页概览：展示课程数、任务数、完成率、笔记数、复习计划数与 AI 使用次数。
- 课程管理：课程信息新增、查询、更新、删除。
- 学习任务：任务新增、列表展示、优先级展示、状态切换。
- 学习笔记：笔记新增、标签记录、列表查看。
- 复习计划：复习计划新增、状态切换、进度追踪。
- 数据统计：基于数据库聚合展示课程分布、状态分布与核心指标。
- AI 学习助手：输入课程/任务/笔记后生成学习建议并记录 AI 日志。

## 3. 技术栈

- 前端：React 17、Ant Design 4、Redux。
- 后端：Node.js、Express、Mongoose。
- 数据库：MongoDB Atlas（默认）。
- AI 接入：OpenAI Chat Completions API（可选配置）。

## 4. 运行方式

1. 在项目根目录准备环境文件：将 `.variables.env.tmp` 复制为 `.variables.env`。
2. 配置数据库连接：
   - 默认主链路：设置 `ATLAS_DATABASE`（或兼容字段 `DATABASE`）为 Atlas 连接串。
   - 本地备用链路（可选）：设置 `ALLOW_LOCAL_FALLBACK=true`，并配置 `DATABASE_LOCAL`。
3. 初始化管理员账号：
   - 根目录执行：`npm run setup`
4. 准备演示数据：
   - 根目录执行：`npm run seed:studyhub-demo`
5. 启动服务：
   - 后端：根目录执行 `npm start`
   - 前端：`cd frontend && npm start`
6. 主链路校验（后端启动后）：
   - 根目录执行：`npm run verify:studyhub`

## 5. 演示步骤

1. 打开登录页，使用演示账号登录。
2. 依次演示课程、任务、笔记、复习计划模块的数据展示与操作。
3. 打开首页概览与数据统计页，展示实时统计指标和分布结果。
4. 打开 AI 学习助手：
   - 已配置 key：展示真实生成结果。
   - 未配置 key：展示友好提示，并说明日志仍会记录。

## 6. 截图清单

截图目录：`docs/screenshots`

- `fig01-login.png`：登录页
- `fig02-dashboard.png`：首页概览
- `fig03-course.png`：课程管理
- `fig04-task.png`：学习任务
- `fig05-note.png`：学习笔记
- `fig06-review-plan.png`：复习计划
- `fig07-statistics.png`：数据统计
- `fig08-ai-assistant.png`：AI 学习助手

## 7. AI 模块说明

- AI 入口保留在导航栏“AI 学习助手”。
- 未配置 `OPENAI_API_KEY` 时，页面显示正式友好提示，不中断页面流程。
- 已配置 `OPENAI_API_KEY` 时，系统调用 OpenAI 接口返回学习建议。
- 无论 key 是否配置，AI 请求都会写入 `ai_logs` 集合（成功或失败均有记录字段）。

## 8. 数据库说明

- 默认运行方式：MongoDB Atlas（用于正式演示和补交）。
- 会话存储与业务数据统一使用同一 Mongo URI，避免连接不一致问题。
- 本地 Mongo 仅作为开发备用方案，通过显式开关启用，不影响 Atlas 默认链路。
