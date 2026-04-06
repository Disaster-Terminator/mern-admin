import React from "react";
import { useDispatch } from "react-redux";

import { Layout, Avatar, Dropdown, Menu } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { logout } from "@/redux/auth/actions";
const { Header } = Layout;

export default function HeaderContent() {
  const dispatch = useDispatch();

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      dispatch(logout());
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <Header className="studyhubHeader">
      <div className="studyhubHeaderInner">
        <div className="studyhubHeaderMeta">
          <p className="studyhubHeaderKicker">StudyHub</p>
          <h3>学习管理控制台</h3>
        </div>
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}
