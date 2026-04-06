import React from "react";
import { Form, Input, Select } from "antd";

const { TextArea } = Input;

export default function TaskForm() {
  return (
    <>
      <Form.Item
        label="任务标题"
        name="title"
        rules={[
          {
            required: true,
            message: "请输入任务标题",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="所属课程"
        name="course"
        rules={[
          {
            required: true,
            message: "请输入所属课程",
          },
        ]}
      >
        <Input placeholder="请填写课程名称" />
      </Form.Item>
      <Form.Item label="截止日期" name="dueDate">
        <Input placeholder="例如：2026-04-20" />
      </Form.Item>
      <Form.Item label="优先级" name="priority" initialValue="medium">
        <Select>
          <Select.Option value="high">高</Select.Option>
          <Select.Option value="medium">中</Select.Option>
          <Select.Option value="low">低</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="状态" name="status" initialValue="pending">
        <Select>
          <Select.Option value="pending">待办</Select.Option>
          <Select.Option value="completed">已完成</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="备注" name="remark">
        <TextArea rows={3} />
      </Form.Item>
    </>
  );
}
