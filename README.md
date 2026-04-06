# StudyHub 智能学习任务管理系统

StudyHub 是一个面向学习场景的课程任务管理系统，覆盖课程管理、学习任务、学习笔记、复习计划、数据统计和 AI 学习助手。

默认数据库主链路为 MongoDB Atlas。

## 技术栈

- 后端：Node.js、Express、Mongoose
- 前端：React 17、Ant Design 4、Redux
- 数据库：MongoDB Atlas（默认）
- AI：OpenAI Chat Completions API（可选）

## 快速开始

1. 安装依赖
   - 根目录执行：`npm install`
   - 前端目录执行：`cd frontend && npm install`
2. 准备环境文件
   - 将 `.variables.env.tmp` 复制为 `.variables.env`
3. 配置数据库
   - 在 `.variables.env` 中设置 `ATLAS_DATABASE`
   - 兼容字段 `DATABASE` 仍可使用，但默认优先读取 `ATLAS_DATABASE`
4. 初始化管理员
   - 根目录执行：`npm run setup`
5. 准备样例数据
   - 根目录执行：`npm run seed:studyhub-demo`
6. 启动服务
   - 后端：`npm start`
   - 前端：`cd frontend && npm start`

## 验证命令

- 后端主链路校验：`npm run verify:studyhub`
- 前端生产构建：`cd frontend && npm run build`

## AI 助手说明

- 未配置 `OPENAI_API_KEY`：页面显示友好提示，流程可继续，调用日志仍会写入 `ai_logs`
- 已配置 `OPENAI_API_KEY`：调用真实模型返回学习建议

## 文档

- 运行与补交流程：`docs/submission-guide.md`
