import React from "react";

import CrudModule from "@/modules/CrudModule";
import CourseForm from "@/forms/CourseForm";

function Course() {
  const entity = "course";
  const searchConfig = {
    displayLabels: ["name", "teacher", "location"],
    searchFields: "name,teacher,location",
    outputValue: "_id",
  };

  const panelTitle = "课程管理";
  const dataTableTitle = "课程列表";
  const entityDisplayLabels = ["name"];

  const readColumns = [
    {
      title: "课程名称",
      dataIndex: "name",
    },
    {
      title: "授课老师",
      dataIndex: "teacher",
    },
    {
      title: "上课地点",
      dataIndex: "location",
    },
    {
      title: "上课星期",
      dataIndex: "weekday",
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
  ];

  const dataTableColumns = [
    {
      title: "课程名称",
      dataIndex: "name",
    },
    {
      title: "授课老师",
      dataIndex: "teacher",
    },
    {
      title: "上课地点",
      dataIndex: "location",
    },
    {
      title: "上课星期",
      dataIndex: "weekday",
    },
  ];

  const ADD_NEW_ENTITY = "新增课程";
  const DATATABLE_TITLE = "课程列表";
  const ENTITY_NAME = "课程";
  const CREATE_ENTITY = "创建课程";
  const UPDATE_ENTITY = "更新课程";

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
      createForm={<CourseForm />}
      updateForm={<CourseForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Course;
