import React from "react";
import { useCrudContext } from "@/context/crud";
import { Drawer } from "antd";
import CollapseBox from "../CollapseBox";

export default function SidePanel({
  config,
  topContent,
  bottomContent,
}) {
  const { ADD_NEW_ENTITY } = config;
  const { state, crudContextAction } = useCrudContext();
  const { isPanelCollapsed, isBoxCollapsed } = state;
  const { panel, collapsedBox } = crudContextAction;

  const closePanel = () => {
    panel.close();
  };

  const collapsePanelBox = () => {
    collapsedBox.collapse();
  };

  return (
    <Drawer
      className="crudSidePanelDrawer"
      title={config.panelTitle || "详情"}
      placement="right"
      width={460}
      onClose={closePanel}
      visible={!isPanelCollapsed}
      destroyOnClose={false}
      maskClosable={true}
    >
      <CollapseBox
        buttonTitle={ADD_NEW_ENTITY}
        isCollapsed={isBoxCollapsed}
        onCollapse={collapsePanelBox}
        topContent={topContent}
        bottomContent={bottomContent}
      ></CollapseBox>
    </Drawer>
  );
}
