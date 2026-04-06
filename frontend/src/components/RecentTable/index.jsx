import React from "react";
import { Dropdown, Table } from "antd";

import { request } from "@/request";
import useFetch from "@/hooks/useFetch";

import {
  EllipsisOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function DropDownRowMenu({ row }) {
  const Show = () => {};
  function Edit() {}
  function Delete() {}
  return [
    {
      key: `show-${row._id}`,
      icon: <EyeOutlined />,
      label: "Show",
      onClick: Show,
    },
    {
      key: `edit-${row._id}`,
      icon: <EditOutlined />,
      label: "Edit",
      onClick: Edit,
    },
    {
      key: `delete-${row._id}`,
      icon: <DeleteOutlined />,
      label: "Delete",
      onClick: Delete,
    },
  ];
}

export default function RecentTable({ ...props }) {
  let { entity, dataTableColumns } = props;
  dataTableColumns = [
    ...dataTableColumns,
    {
      title: "",
      render: (row) => (
        <Dropdown menu={{ items: DropDownRowMenu({ row }) }} trigger={["click"]}>
          <EllipsisOutlined style={{ cursor: "pointer", fontSize: "24px" }} />
        </Dropdown>
      ),
    },
  ];

  const asyncList = () => {
    return request.list(entity);
  };
  const { result, isLoading, isSuccess } = useFetch(asyncList);
  const firstFiveItems = () => {
    if (isSuccess && result) return result.slice(0, 5);
    return [];
  };
  return (
    <>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={isSuccess && firstFiveItems()}
        pagination={false}
        loading={isLoading}
      />
    </>
  );
}
