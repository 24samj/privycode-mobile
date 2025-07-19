// app.config.js
import appJson from "./app.json";

export default ({ config }) => ({
  // 1. Pull in everything from app.json
  ...appJson,

  // 2. Overwrite only the `expo` block, merging your env var
  expo: {
    ...appJson.expo,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  },
});
