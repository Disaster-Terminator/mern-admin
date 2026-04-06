import React, { useLayoutEffect } from "react";
import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import CreateForm from "@/components/CreateForm";
import UpdateForm from "@/components/UpdateForm";
import DeleteModal from "@/components/DeleteModal";
import ReadItem from "@/components/ReadItem";
import SearchItem from "@/components/SearchItem";

import { useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";

import { CrudLayout } from "@/layout";

import CrudDataTable from "./CrudDataTable";

function SidePanelTopContent({ config, formElements }) {
  return (
    <>
      <ReadItem config={config} />
      <UpdateForm config={config} formElements={formElements} />
    </>
  );
}

function FixHeaderPanel({ config }) {
  const dispatch = useDispatch();
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel, readBox } = crudContextAction;
  const { panelSubTitle, panelTitle, ADD_NEW_ENTITY, entity } = config;

  const addNewItem = () => {
    panel.open();
    collapsedBox.close();
    readBox.close();
  };

  const refreshList = () => {
    dispatch(crud.list(entity, 1));
  };

  return (
    <div className="crudPageHeader">
      <div className="crudPageHeading">
        <div className="crudPageTitleGroup">
          <h1 className="crudPageTitle">{panelTitle}</h1>
          {panelSubTitle ? (
            <p className="crudPageSubTitle">{panelSubTitle}</p>
          ) : null}
        </div>
        <Space className="crudPageActions" size={10}>
          <Button onClick={refreshList}>刷新列表</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={addNewItem}>
            {ADD_NEW_ENTITY}
          </Button>
        </Space>
      </div>
      <div className="crudPageToolbar">
        <div className="crudPageSearch">
          <SearchItem config={config} />
        </div>
      </div>
    </div>
  );
}

export default function CrudModule({ config, createForm, updateForm }) {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(crud.resetState());
  }, [dispatch]);

  return (
    <CrudLayout
      config={config}
      fixHeaderPanel={<FixHeaderPanel config={config} />}
      sidePanelBottomContent={
        <CreateForm config={config} formElements={createForm} />
      }
      sidePanelTopContent={
        <SidePanelTopContent config={config} formElements={updateForm} />
      }
    >
      <CrudDataTable config={config} />
      <DeleteModal config={config} />
    </CrudLayout>
  );
}
