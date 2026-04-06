import React from "react";

import DefaultLayout from "../DefaultLayout";
import HeaderContent from "../HeaderContent";

import SidePanel from "@/components/SidePanel";
import { Layout } from "antd";

const { Content } = Layout;

export default function CrudLayout({
  children,
  config,
  sidePanelTopContent,
  sidePanelBottomContent,
  fixHeaderPanel,
}) {
  return (
    <DefaultLayout>
      <Layout className="studyhubPageLayout">
        <HeaderContent />
        <Content className="studyhubPageContent">
          <div className="studyhubPageContentInner">
            {fixHeaderPanel}
            {children}
          </div>
        </Content>
      </Layout>
      <SidePanel
        config={config}
        topContent={sidePanelTopContent}
        bottomContent={sidePanelBottomContent}
      ></SidePanel>
    </DefaultLayout>
  );
}
