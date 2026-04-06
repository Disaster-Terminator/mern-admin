import React from "react";

import HeaderContent from "../HeaderContent";

import { Layout } from "antd";

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <Layout className="studyhubPageLayout">
      <HeaderContent />
      <Content className="studyhubPageContent">
        <div className="studyhubPageContentInner">{children}</div>
      </Content>
    </Layout>
  );
}
