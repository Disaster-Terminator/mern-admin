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
      setResult(data.result);
    } else {
      setResult({
        configured: true,
        output: "",
        message: (data && data.message) || "AI 调用失败，请稍后重试",
      });
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={10}>
          <Card title="AI 学习助手">
            <Form layout="vertical" onFinish={onFinish} initialValues={{ actionType: "综合建议" }}>
              <Form.Item label="课程名" name="course">
                <Input placeholder="例如：软件工程" />
              </Form.Item>
              <Form.Item label="任务描述" name="taskDescription">
                <TextArea rows={4} placeholder="输入当前学习任务、ddl、难点等" />
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
                message="请在左侧输入信息并点击生成"
                description="结果会展示在这里，并自动写入 ai_logs 集合。"
              />
            ) : null}

            {!loading && result && result.configured === false ? (
              <Alert
                showIcon
                type="warning"
                message="AI API 未配置"
                description={result.message || "请在 .variables.env 中配置 OPENAI_API_KEY"}
              />
            ) : null}

            {!loading && result && result.configured !== false ? (
              <>
                <Alert
                  showIcon
                  type="success"
                  message={result.message || "AI 结果生成成功"}
                  description={`模型：${result.model || "默认模型"}`}
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
                  {result.output || "本次未返回可读内容"}
                </div>
              </>
            ) : null}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
