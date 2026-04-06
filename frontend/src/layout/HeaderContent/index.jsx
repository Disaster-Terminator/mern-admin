import React from "react";
import { useDispatch } from "react-redux";

import { Layout, Avatar, Menu, Dropdown } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { logout } from "@/redux/auth/actions";
import uniqueId from "@/utils/uinqueId";
const { Header } = Layout;

export default function HeaderContent() {
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item key={`${uniqueId()}`} onClick={() => dispatch(logout())}>
        退出登录
      </Menu.Item>
    </Menu>
  );
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
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}
