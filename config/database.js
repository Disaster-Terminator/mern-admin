const DEFAULT_LOCAL_DATABASE = "mongodb://127.0.0.1:27017/studyhub_local";

const isTrue = (value) => `${value || ""}`.toLowerCase() === "true";

const maskMongoUri = (value = "") => {
  if (!value) return "";
  return value.replace(/(mongodb\+srv:\/\/[^:]+):[^@]+@/, "$1:****@");
};

const resolveDatabaseConfig = () => {
  const atlasDatabase = `${process.env.ATLAS_DATABASE || process.env.DATABASE || ""}`.trim();
  const localDatabase = `${process.env.DATABASE_LOCAL || DEFAULT_LOCAL_DATABASE}`.trim();
  const allowLocalFallback = isTrue(process.env.ALLOW_LOCAL_FALLBACK);

  if (atlasDatabase) {
    return {
      source: "atlas",
      mongoUri: atlasDatabase,
      allowLocalFallback,
    };
  }

  if (allowLocalFallback) {
    return {
      source: "local-fallback",
      mongoUri: localDatabase,
      allowLocalFallback,
    };
  }

  throw new Error(
    "未检测到 Atlas 数据库连接。请在 .variables.env 中配置 ATLAS_DATABASE（或 DATABASE）；仅开发备用时可设置 ALLOW_LOCAL_FALLBACK=true 并配置 DATABASE_LOCAL。"
  );
};

module.exports = {
  DEFAULT_LOCAL_DATABASE,
  resolveDatabaseConfig,
  maskMongoUri,
};
