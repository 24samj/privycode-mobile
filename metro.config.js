// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

let config = getDefaultConfig(__dirname);

config = withNativeWind(config, {
  input: "./global.css",
});

module.exports = wrapWithReanimatedMetroConfig(config);
