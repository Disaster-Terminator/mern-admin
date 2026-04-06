import React from "react";
import { Form, Input, Select } from "antd";

const { TextArea } = Input;

export default function ReviewPlanForm() {
  return (
    <>
      <Form.Item
        label="课程"
        name="course"
        rules={[
          {
            required: true,
            message: "请输入课程名称",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="复习日期" name="reviewDate">
        <Input placeholder="例如：2026-04-18" />
      </Form.Item>
      <Form.Item
        label="复习目标"
        name="target"
        rules={[
          {
            required: true,
            message: "请输入复习目标",
          },
        ]}
      >
        <Input />
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
