import React from "react";

import CrudModule from "@/modules/CrudModule";
import NoteForm from "@/forms/NoteForm";

function Note() {
  const entity = "note";
  const searchConfig = {
    displayLabels: ["title", "course", "content"],
    searchFields: "title,course,content",
    outputValue: "_id",
  };

  const panelTitle = "学习笔记";
  const dataTableTitle = "笔记列表";
  const entityDisplayLabels = ["title"];

  const renderTags = (tags) => {
    if (!tags) return "";
    if (Array.isArray(tags)) return tags.join(" / ");
    return tags;
  };

  const readColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "课程",
      dataIndex: "course",
    },
    {
      title: "内容",
      dataIndex: "content",
    },
    {
      title: "标签",
      dataIndex: "tags",
      render: renderTags,
    },
  ];

  const dataTableColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "课程",
      dataIndex: "course",
    },
    {
      title: "标签",
      dataIndex: "tags",
      render: renderTags,
    },
  ];

  const ADD_NEW_ENTITY = "新增笔记";
  const DATATABLE_TITLE = "笔记列表";
  const ENTITY_NAME = "笔记";
  const CREATE_ENTITY = "创建笔记";
  const UPDATE_ENTITY = "更新笔记";

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
      createForm={<NoteForm />}
      updateForm={<NoteForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Note;
