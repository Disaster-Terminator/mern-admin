import React, { useState } from "react";
import { Alert, Button, Card, Col, Form, Input, Row, Select, Spin } from "antd";

import { DashboardLayout } from "@/layout";
import { request } from "@/request";

const { TextArea } = Input;

export default function AIAssistant() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    const data = await request.post("studyhub/ai-assistant", values);

    if (data && data.success) {
      setResult({
        ...data.result,
        message: data.message,
        isError: false,
      });
    } else {
      setResult({
        configured:
          data && data.result && data.result.configured === false ? false : true,
        output: (data && data.result && data.result.output) || "",
        model: data && data.result && data.result.model,
        message: (data && data.message) || "AI 服务暂不可用，请稍后重试",
        isError: true,
      });
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ marginBottom: 0 }}>AI 学习助手</h1>
        <p style={{ marginBottom: 0, color: "#666" }}>
          基于课程、任务与笔记生成可执行学习建议，并保留调用日志。
        </p>
      </div>
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={10}>
          <Card title="AI 学习助手">
            <Form layout="vertical" onFinish={onFinish} initialValues={{ actionType: "综合建议" }}>
              <Form.Item label="课程名称" name="course">
                <Input placeholder="例如：软件工程" />
              </Form.Item>
              <Form.Item label="任务描述" name="taskDescription">
                <TextArea rows={4} placeholder="输入当前学习任务、截止时间、难点等" />
              </Form.Item>
              <Form.Item label="笔记内容" name="noteContent">
                <TextArea rows={6} placeholder="可粘贴课堂笔记，生成摘要或复习建议" />
              </Form.Item>
              <Form.Item label="输出模式" name="actionType">
                <Select>
                  <Select.Option value="学习建议">学习建议</Select.Option>
                  <Select.Option value="任务拆分">任务拆分</Select.Option>
                  <Select.Option value="笔记摘要">笔记摘要</Select.Option>
                  <Select.Option value="综合建议">综合建议</Select.Option>
                </Select>
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                生成 AI 结果
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card title="返回结果">
            {loading ? (
              <div style={{ textAlign: "center", padding: 50 }}>
                <Spin size="large" />
              </div>
            ) : null}

            {!loading && !result ? (
              <Alert
                showIcon
                type="info"
                message="输入学习信息后即可生成建议"
                description="系统会将每次请求记录到 ai_logs，便于后续学习复盘与统计分析。"
              />
            ) : null}

            {!loading && result && result.configured === false ? (
              <Alert
                showIcon
                type="warning"
                message="AI 助手暂未启用"
                description={
                  result.message ||
                  "当前环境未配置 OPENAI_API_KEY。你仍可使用本页面提交内容，系统会保留调用日志。"
                }
              />
            ) : null}

            {!loading && result && result.configured !== false && !result.isError ? (
              <>
                <Alert
                  showIcon
                  type="success"
                  message={result.message || "AI 结果生成成功"}
                  description={`模型：${result.model || "gpt-4o-mini"}`}
                  style={{ marginBottom: 16 }}
                />
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    minHeight: 220,
                    background: "#fafafa",
                    border: "1px solid #f0f0f0",
                    borderRadius: 6,
                    padding: 16,
                  }}
                >
                  {result.output || "本次未返回可读文本"}
                </div>
              </>
            ) : null}

            {!loading && result && result.configured !== false && result.isError ? (
              <Alert
                showIcon
                type="error"
                message="AI 请求未成功"
                description={result.message || "请检查服务配置后重试"}
              />
            ) : null}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
