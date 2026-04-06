import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Layout, Avatar, Dropdown, Menu } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { logout } from "@/redux/auth/actions";
const { Header } = Layout;

const routeMetaList = [
  {
    path: "/",
    title: "首页概览",
    subTitle: "聚焦学习执行状态与关键趋势",
  },
  {
    path: "/course",
    title: "课程管理",
    subTitle: "维护课程结构、授课信息与课堂安排",
  },
  {
    path: "/task",
    title: "学习任务",
    subTitle: "跟进任务优先级、截止时间与完成状态",
  },
  {
    path: "/note",
    title: "学习笔记",
    subTitle: "沉淀课程知识点与复盘内容",
  },
  {
    path: "/review-plan",
    title: "复习计划",
    subTitle: "组织复习目标、节奏与执行进度",
  },
  {
    path: "/statistics",
    title: "数据统计",
    subTitle: "观察学习过程数据，辅助决策优化",
  },
  {
    path: "/ai-assistant",
    title: "AI 学习助手",
    subTitle: "基于课程、任务与笔记获取智能建议",
  },
];

export default function HeaderContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      dispatch(logout());
    }
  };

  const currentRouteMeta =
    routeMetaList.find(
      (item) => item.path !== "/" && location.pathname.startsWith(item.path)
    ) ||
    routeMetaList.find((item) => item.path === location.pathname) ||
    routeMetaList[0];

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <Header className="studyhubHeader">
      <div className="studyhubHeaderInner">
        <div className="studyhubHeaderMeta">
          <p className="studyhubHeaderKicker">StudyHub Workspace</p>
          <h3>{currentRouteMeta.title}</h3>
          <p className="studyhubHeaderDescription">{currentRouteMeta.subTitle}</p>
        </div>
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}
