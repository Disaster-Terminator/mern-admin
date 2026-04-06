import { notification } from "antd";
import history from "@/utils/history";
import codeMessage from "./codeMessage";

const errorHandler = (error, emptyResult = null) => {
  const { response } = error;

  if (!response) {
    // notification.config({
    //   duration: 20,
    // });
    // notification.error({
    //   message: "No internet connection",
    //   description: "Cannot connect to the server, Check your internet network",
    // });
    return {
      success: false,
      result: emptyResult,
      message: "无法连接服务器，请检查网络或后端服务状态",
    };
  } else if (response && response.status) {
    const message = response.data && response.data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    notification.config({
      duration: 20,
    });
    notification.error({
      message: `请求失败 ${status}`,
      description: errorText,
    });
    if (error.response.data.jwtExpired) {
      history.push("/logout");
    }
    return response.data;
  } else {
    notification.config({
      duration: 20,
    });
    notification.error({
      message: "未知错误",
      description: "应用发生未知错误，请稍后重试。",
    });
    return {
      success: false,
      result: emptyResult,
      message: "应用发生未知错误，请稍后重试。",
    };
  }
};

export default errorHandler;
