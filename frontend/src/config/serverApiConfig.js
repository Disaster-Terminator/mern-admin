const normalizeBaseUrl = (url) => {
  if (!url) return url;
  return url.endsWith("/") ? url : `${url}/`;
};

const envApiBase = normalizeBaseUrl(process.env.REACT_APP_API_BASE_URL);

export const API_BASE_URL = envApiBase
  ? envApiBase
  : process.env.NODE_ENV === "production" ||
      process.env.REACT_APP_DEV_REMOTE === "remote"
    ? "/api/"
    : "http://localhost:8888/api/";

export const ACCESS_TOKEN_NAME = "x-auth-token"
