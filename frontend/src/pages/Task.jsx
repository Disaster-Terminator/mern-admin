import React, { useState } from "react";
import { Switch, Tag, message } from "antd";
import { useDispatch } from "react-redux";

import CrudModule from "@/modules/CrudModule";
import TaskForm from "@/forms/TaskForm";
import { request } from "@/request";
import { crud } from "@/redux/crud/actions";

function StatusTag({ status }) {
  return (
    <Tag color={status === "completed" ? "green" : "orange"}>
      {status === "completed" ? "已完成" : "待办"}
    </Tag>
  );
}

function TaskStatusSwitch({ row }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isCompleted = row.status === "completed";

  const handleToggle = async () => {
    setLoading(true);
    const data = await request.patch(`task/toggle-status/${row._id}`, {});
    if (data && data.success) {
      dispatch(crud.list("task"));
    } else {
      message.error((data && data.message) || "任务状态切换失败，请稍后重试");
    }
    setLoading(false);
  };

  return (
    <Switch
      checked={isCompleted}
      checkedChildren="完成"
      unCheckedChildren="待办"
      loading={loading}
      onChange={handleToggle}
    />
  );
}

function Task() {
  const entity = "task";
  const searchConfig = {
    displayLabels: ["title", "course", "status"],
    searchFields: "title,course,status",
    outputValue: "_id",
  };

  const panelTitle = "学习任务";
  const dataTableTitle = "任务列表";
  const entityDisplayLabels = ["title"];

  const readColumns = [
    {
      title: "任务标题",
      dataIndex: "title",
    },
    {
      title: "所属课程",
      dataIndex: "course",
    },
    {
      title: "截止日期",
      dataIndex: "dueDate",
    },
    {
      title: "优先级",
      dataIndex: "priority",
      render: (priority) => {
        const colorMap = {
          high: "red",
          medium: "gold",
          low: "blue",
        };
        const labelMap = {
          high: "高",
          medium: "中",
          low: "低",
        };
        return <Tag color={colorMap[priority] || "default"}>{labelMap[priority] || priority}</Tag>;
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
  ];

  const dataTableColumns = [
    {
      title: "任务标题",
      dataIndex: "title",
    },
    {
      title: "所属课程",
      dataIndex: "course",
    },
    {
      title: "截止日期",
      dataIndex: "dueDate",
    },
    {
      title: "优先级",
      dataIndex: "priority",
      render: (priority) => {
        const colorMap = {
          high: "red",
          medium: "gold",
          low: "blue",
        };
        const labelMap = {
          high: "高",
          medium: "中",
          low: "低",
        };
        return <Tag color={colorMap[priority] || "default"}>{labelMap[priority] || priority}</Tag>;
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: "快速切换",
      render: (row) => <TaskStatusSwitch row={row} />,
    },
  ];

  const ADD_NEW_ENTITY = "新增任务";
  const DATATABLE_TITLE = "任务列表";
  const ENTITY_NAME = "任务";
  const CREATE_ENTITY = "创建任务";
  const UPDATE_ENTITY = "更新任务";

  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };

  return (
    <CrudModule
      createForm={<TaskForm />}
      updateForm={<TaskForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Task;
