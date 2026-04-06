import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  CheckSquareOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BarChartOutlined,
  RobotOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = () => {
    setCollapsed((prev) => !prev);
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

  const selectedKeyByPath = {
    "/": "1",
    "/course": "2",
    "/task": "3",
    "/note": "4",
    "/review-plan": "5",
    "/statistics": "6",
    "/ai-assistant": "7",
  };

  const matchedPath = Object.keys(selectedKeyByPath).find(
    (path) => path !== "/" && location.pathname.startsWith(path)
  );

  const selectedKey =
    (matchedPath && selectedKeyByPath[matchedPath]) ||
    selectedKeyByPath[location.pathname] ||
    "1";

  return (
    <Sider
      className="studyhubSider"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={248}
      collapsedWidth={88}
      onCollapse={onCollapse}
    >
      <div className="studyhubSiderBrand">
        <div className="studyhubBrandMark">SH</div>
        {!collapsed ? (
          <div className="studyhubBrandText">
            <strong>StudyHub</strong>
            <span>智能学习管理</span>
          </div>
        ) : null}
      </div>
      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        mode="inline"
        items={menuItems}
        className="studyhubSiderMenu"
      />
      <div className="studyhubSiderFooter">
        <button
          type="button"
          className="studyhubSiderTrigger"
          onClick={onCollapse}
          aria-label={collapsed ? "展开侧边导航" : "收起侧边导航"}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          {!collapsed ? <span>收起导航</span> : null}
        </button>
      </div>
    </Sider>
  );
}
export default Navigation;
