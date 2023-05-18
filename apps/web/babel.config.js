module.exports = {
  presets: ["next/babel"],
  // presets: ['@expo/next-adapter/babel'],
  plugins: [
    ["styled-components", { ssr: true }],
    ["react-native-web", { commonjs: true }],
  ],
};
