import React, { useCallback, useEffect } from "react";
import { Dropdown, Button, PageHeader, Table } from "antd";

import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectListItems } from "@/redux/crud/selectors";

import uniqueId from "@/utils/uinqueId";

export default function DataTable({ config, DropDownRowMenu, AddNewItem }) {
  let { entity, dataTableColumns, dataTableTitle } = config;
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

  const { result: listResult, isLoading: listIsLoading } = useSelector(
    selectListItems
  );

  const { pagination, items } = listResult;

  const dispatch = useDispatch();

  const handleDataTableLoad = useCallback(
    (nextPagination) => {
      const page = (nextPagination && nextPagination.current) || 1;
      dispatch(crud.list(entity, page));
    },
    [dispatch, entity]
  );

  const handleRefresh = () => {
    dispatch(crud.list(entity, 1));
  };

  useEffect(() => {
    dispatch(crud.list(entity));
  }, [dispatch, entity]);

  return (
    <>
      <PageHeader
        title={dataTableTitle}
        ghost={false}
        extra={[
          <Button onClick={handleRefresh} key={`${uniqueId()}`}>
            刷新
          </Button>,
          <AddNewItem key={`${uniqueId()}`} config={config} />,
        ]}
        style={{
          padding: "20px 0px",
        }}
      ></PageHeader>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={items}
        pagination={pagination}
        loading={listIsLoading}
        locale={{ emptyText: "暂无数据" }}
        onChange={handleDataTableLoad}
      />
    </>
  );
}
