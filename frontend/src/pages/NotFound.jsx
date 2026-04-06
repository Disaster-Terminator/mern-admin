import React, { useEffect } from "react";
import { Button, Result } from "antd";
import history from "@/utils/history";
const NotFound = () => {
  useEffect(() => {
    history.replace("/notfound");
  }, []);
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，当前访问的页面不存在。"
        extra={
          <Button href="/" type="primary">
            返回首页
          </Button>
        }
      />
    </>
  );
};
export default NotFound;
