import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  CheckSquareOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BarChartOutlined,
  RobotOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/">首页概览</Link>,
    },
    {
      key: "2",
      icon: <BookOutlined />,
      label: <Link to="/course">课程管理</Link>,
    },
    {
      key: "3",
      icon: <CheckSquareOutlined />,
      label: <Link to="/task">学习任务</Link>,
    },
    {
      key: "4",
      icon: <FileTextOutlined />,
      label: <Link to="/note">学习笔记</Link>,
    },
    {
      key: "5",
      icon: <CalendarOutlined />,
      label: <Link to="/review-plan">复习计划</Link>,
    },
    {
      key: "6",
      icon: <BarChartOutlined />,
      label: <Link to="/statistics">数据统计</Link>,
    },
    {
      key: "7",
      icon: <RobotOutlined />,
      label: <Link to="/ai-assistant">AI 学习助手</Link>,
    },
  ];

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
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
    </>
  );
}
export default Navigation;
