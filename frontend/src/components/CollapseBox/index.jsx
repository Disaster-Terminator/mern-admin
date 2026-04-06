import React from "react";
import { Button, Space } from "antd";

export default function CollapseBox({
  topContent,
  bottomContent,
  buttonTitle,
  isCollapsed,
  onCollapse,
}) {
  const openDetailMode = () => {
    if (!isCollapsed) {
      onCollapse();
    }
  };

  const openCreateMode = () => {
    if (isCollapsed) {
      onCollapse();
    }
  };

  const detailStyle = isCollapsed
    ? { display: "block", opacity: 1 }
    : { display: "none", opacity: 0 };

  const createStyle = !isCollapsed
    ? { display: "block", opacity: 1 }
    : { display: "none", opacity: 0 };

  return (
    <div className="crudCollapseBox">
      <div className="crudCollapseSwitcher">
        <Space size={8}>
          <Button
            type={isCollapsed ? "primary" : "default"}
            onClick={openDetailMode}
          >
            查看/编辑
          </Button>
          <Button
            type={!isCollapsed ? "primary" : "default"}
            onClick={openCreateMode}
          >
            {buttonTitle}
          </Button>
        </Space>
      </div>
      <div className="crudCollapseContent">
        <div style={detailStyle}>{topContent}</div>
        <div style={createStyle}>{bottomContent}</div>
      </div>
    </div>
  );
}
