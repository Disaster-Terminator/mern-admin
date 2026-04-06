import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          zIndex: 1000,
        }}
      >
        <div className="logo">{collapsed ? "SH" : "StudyHub 01518"}</div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">首页概览</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/course">课程管理</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CheckSquareOutlined />}>
            <Link to="/task">学习任务</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
export default Navigation;
