import React, { useCallback, useEffect } from "react";
import { Dropdown, Table } from "antd";

import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectListItems } from "@/redux/crud/selectors";

export default function DataTable({ config, DropDownRowMenu }) {
  let { entity, dataTableColumns } = config;
  dataTableColumns = [
    ...dataTableColumns,
    {
      title: "",
      align: "center",
      width: 60,
      render: (row) => (
        <Dropdown overlay={DropDownRowMenu({ row })} trigger={["click"]}>
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

  useEffect(() => {
    dispatch(crud.list(entity));
  }, [dispatch, entity]);

  return (
    <div className="crudTableShell">
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={items}
        pagination={pagination}
        size="middle"
        loading={listIsLoading}
        locale={{ emptyText: "暂无数据" }}
        onChange={handleDataTableLoad}
      />
    </div>
  );
}
