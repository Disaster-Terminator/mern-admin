import React from "react";
import { useDispatch } from "react-redux";

import { Layout, Avatar, Dropdown } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { logout } from "@/redux/auth/actions";
const { Header } = Layout;

export default function HeaderContent() {
  const dispatch = useDispatch();

  const menu = {
    items: [{ key: "logout", label: "退出登录" }],
    onClick: ({ key }) => {
      if (key === "logout") {
        dispatch(logout());
      }
    },
  };
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 24px",
        background: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h3 style={{ marginBottom: 0 }}>StudyHub 智能学习任务管理系统</h3>
      <Dropdown menu={menu} placement="bottomRight" arrow>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}
