import React from "react";

import DefaultLayout from "../DefaultLayout";
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
