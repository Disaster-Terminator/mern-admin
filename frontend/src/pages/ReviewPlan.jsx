import React, { useState } from "react";
import { Switch, Tag, message } from "antd";
import { useDispatch } from "react-redux";

import CrudModule from "@/modules/CrudModule";
import ReviewPlanForm from "@/forms/ReviewPlanForm";
import { request } from "@/request";
import { crud } from "@/redux/crud/actions";

function ReviewStatusTag({ status }) {
  return (
    <Tag color={status === "completed" ? "green" : "orange"}>
      {status === "completed" ? "已完成" : "待办"}
    </Tag>
  );
}

function ReviewStatusSwitch({ row }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isCompleted = row.status === "completed";

  const toggleStatus = async () => {
    setLoading(true);
    const nextStatus = isCompleted ? "pending" : "completed";
    const data = await request.patch(`reviewplan/update/${row._id}`, {
      status: nextStatus,
    });
    if (data && data.success) {
      dispatch(crud.list("reviewplan"));
    } else {
      message.error((data && data.message) || "复习计划状态切换失败，请稍后重试");
    }
    setLoading(false);
  };

  return (
    <Switch
      checked={isCompleted}
      checkedChildren="完成"
      unCheckedChildren="待办"
      loading={loading}
      onChange={toggleStatus}
    />
  );
}

function ReviewPlan() {
  const entity = "reviewplan";
  const searchConfig = {
    displayLabels: ["course", "target", "status"],
    searchFields: "course,target,status",
    outputValue: "_id",
    placeholder: "按课程、目标或状态搜索",
  };

  const panelTitle = "复习计划";
  const panelSubTitle = "规划复习目标与时间节点，跟踪执行状态";
  const dataTableTitle = "复习计划列表";
  const entityDisplayLabels = ["course", "target"];

  const readColumns = [
    {
      title: "课程",
      dataIndex: "course",
    },
    {
      title: "复习日期",
      dataIndex: "reviewDate",
    },
    {
      title: "复习目标",
      dataIndex: "target",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => <ReviewStatusTag status={status} />,
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
  ];

  const dataTableColumns = [
    {
      title: "课程",
      dataIndex: "course",
    },
    {
      title: "复习日期",
      dataIndex: "reviewDate",
    },
    {
      title: "复习目标",
      dataIndex: "target",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => <ReviewStatusTag status={status} />,
    },
    {
      title: "状态切换",
      render: (row) => <ReviewStatusSwitch row={row} />,
    },
  ];

  const ADD_NEW_ENTITY = "新增复习计划";
  const DATATABLE_TITLE = "复习计划列表";
  const ENTITY_NAME = "复习计划";
  const CREATE_ENTITY = "创建复习计划";
  const UPDATE_ENTITY = "更新复习计划";

  const config = {
    entity,
    panelTitle,
    panelSubTitle,
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
      createForm={<ReviewPlanForm />}
      updateForm={<ReviewPlanForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default ReviewPlan;
