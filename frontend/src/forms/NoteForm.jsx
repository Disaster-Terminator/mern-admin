import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

export default function NoteForm() {
  return (
    <>
      <Form.Item
        label="笔记标题"
        name="title"
        rules={[
          {
            required: true,
            message: "请输入笔记标题",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="所属课程" name="course">
        <Input />
      </Form.Item>
      <Form.Item
        label="笔记内容"
        name="content"
        rules={[
          {
            required: true,
            message: "请输入笔记内容",
          },
        ]}
      >
        <TextArea rows={6} />
      </Form.Item>
      <Form.Item label="标签" name="tags">
        <Input placeholder="多个标签用英文逗号分隔" />
      </Form.Item>
    </>
  );
}
