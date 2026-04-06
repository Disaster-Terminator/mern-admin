import React from "react";

import { Menu } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  LockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectItemById } from "@/redux/crud/selectors";
import { useCrudContext } from "@/context/crud";
import DataTable from "@/components/DataTable";

function DropDownRowMenu({ row }) {
  const dispatch = useDispatch();
  const { crudContextAction } = useCrudContext();
  const {
    panel,
    collapsedBox,
    modal,
    advancedBox,
    readBox,
    editBox,
  } = crudContextAction;
  const item = useSelector(selectItemById(row._id));

  const showItem = () => {
    dispatch(crud.currentItem(item));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };

  const editItem = () => {
    dispatch(crud.currentAction("update", item));
    editBox.open();
    panel.open();
    collapsedBox.open();
  };

  const updatePassword = () => {
    dispatch(crud.currentAction("update", item));
    advancedBox.open();
    panel.open();
    collapsedBox.open();
  };

  const deleteItem = () => {
    dispatch(crud.currentAction("delete", item));
    modal.open();
  };

  return (
    <Menu style={{ minWidth: 130 }}>
      <Menu.Item key={`show-${row._id}`} icon={<EyeOutlined />} onClick={showItem}>
        查看
      </Menu.Item>
      <Menu.Item key={`edit-${row._id}`} icon={<EditOutlined />} onClick={editItem}>
        编辑
      </Menu.Item>
      <Menu.Item
        key={`password-${row._id}`}
        icon={<LockOutlined />}
        onClick={updatePassword}
      >
        修改密码
      </Menu.Item>
      <Menu.Item
        key={`delete-${row._id}`}
        icon={<DeleteOutlined />}
        onClick={deleteItem}
      >
        删除
      </Menu.Item>
    </Menu>
  );
}

export default function AdminCrudModule({ config }) {
  return <DataTable config={config} DropDownRowMenu={DropDownRowMenu} />;
}
