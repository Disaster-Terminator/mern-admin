import React, { useState } from "react";

import { useHistory, useLocation } from "react-router-dom";
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

const navigationSections = [
  {
    key: "overview",
    label: "总览",
    items: [
      {
        key: "/",
        icon: <DashboardOutlined />,
        label: "首页概览",
        description: "学习进度与执行健康总览",
      },
    ],
  },
  {
    key: "learning",
    label: "学习执行",
    items: [
      {
        key: "/course",
        icon: <BookOutlined />,
        label: "课程管理",
        description: "维护课程结构与课堂安排",
      },
      {
        key: "/task",
        icon: <CheckSquareOutlined />,
        label: "学习任务",
        description: "跟踪任务完成与优先级",
      },
      {
        key: "/note",
        icon: <FileTextOutlined />,
        label: "学习笔记",
        description: "沉淀课堂要点与复盘",
      },
      {
        key: "/review-plan",
        icon: <CalendarOutlined />,
        label: "复习计划",
        description: "规划复习节奏与目标",
      },
    ],
  },
  {
    key: "insight",
    label: "分析与智能",
    items: [
      {
        key: "/statistics",
        icon: <BarChartOutlined />,
        label: "数据统计",
        description: "查看学习过程数据画像",
      },
      {
        key: "/ai-assistant",
        icon: <RobotOutlined />,
        label: "AI 学习助手",
        description: "获取任务与笔记辅助建议",
      },
    ],
  },
];

const flatNavigationItems = navigationSections.flatMap((section) => section.items);

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  const onCollapse = (nextCollapsed) => {
    setCollapsed(nextCollapsed);
  };

  const matchedNavigationItem =
    flatNavigationItems.find(
      (item) => item.key !== "/" && location.pathname.startsWith(item.key)
    ) ||
    flatNavigationItems.find((item) => item.key === location.pathname) ||
    flatNavigationItems[0];

  const selectedKey = matchedNavigationItem ? matchedNavigationItem.key : "/";

  return (
    <Sider
      className="studyhubSider"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={264}
      collapsedWidth={82}
      breakpoint="md"
      onCollapse={onCollapse}
      onBreakpoint={(broken) => setCollapsed(broken)}
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
      {!collapsed ? <p className="studyhubSiderSectionLabel">主导航</p> : null}
      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        mode="inline"
        className="studyhubSiderMenu"
        onClick={({ key }) => history.push(key)}
      >
        {navigationSections.map((section) => (
          <Menu.ItemGroup key={section.key} title={section.label}>
            {section.items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <span className="studyhubSiderNavLabel">{item.label}</span>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        ))}
      </Menu>
      {!collapsed ? (
        <div className="studyhubSiderContext">
          <p>当前模块</p>
          <strong>{matchedNavigationItem.label}</strong>
          <span>{matchedNavigationItem.description}</span>
        </div>
      ) : null}
      <div className="studyhubSiderFooter">
        <button
          type="button"
          className="studyhubSiderTrigger"
          onClick={toggleCollapsed}
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
