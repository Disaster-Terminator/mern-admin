import React, { useEffect, useState, Suspense } from "react";
import { Router as RouterHistory } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "@/router";
import history from "@/utils/history";
import store from "@/redux/store";

import { Button, Result } from "antd";

import useNetwork from "@/hooks/useNetwork";

function App() {
  const { isOnline: isNetwork } = useNetwork();

  if (!isNetwork)
    return (
      <>
        <Result
          status="404"
          title="网络连接不可用"
          subTitle="请检查网络后重试，以继续访问 StudyHub。"
          extra={
            <Button href="/" type="primary">
              重新加载
            </Button>
          }
        />
      </>
    );
  else {
    return (
      <RouterHistory history={history}>
        <Provider store={store}>
          <Router />
        </Provider>
      </RouterHistory>
    );
  }
}

export default App;
