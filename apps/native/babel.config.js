/** @type {import("@babel/core").ConfigFunction} */

module.exports = function (api) {
  require("dotenv").config();
  api.cache.forever();

  // Make Expo Router run from `src/app` instead of `app`.
  // Path is relative to `/node_modules/expo-router`
  process.env.EXPO_ROUTER_APP_ROOT = "../../apps/native/src/app";

  // console.log(process.env)

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "transform-inline-environment-variables",
      "nativewind/babel",
      "expo-router/babel",
      ["module-resolver", { alias: { "~": "./src" } }],
    ],
  };
};
