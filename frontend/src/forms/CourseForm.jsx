import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

export default function CourseForm() {
  return (
    <>
      <Form.Item
        label="课程名称"
        name="name"
        rules={[
          {
            required: true,
            message: "请输入课程名称",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="授课老师" name="teacher">
        <Input />
      </Form.Item>
      <Form.Item label="上课地点" name="location">
        <Input />
      </Form.Item>
      <Form.Item label="上课星期" name="weekday">
        <Input placeholder="例如：周一" />
      </Form.Item>
      <Form.Item label="备注" name="remark">
        <TextArea rows={3} />
      </Form.Item>
    </>
  );
}
