import type { ConfigContext, ExpoConfig } from "@expo/config";

// https://docs.expo.dev/workflow/configuration/#dynamic-configuration
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Media",
  slug: "media",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "io.github.zimekk.media",
    infoPlist: {
      UIBackgroundModes: ["audio"],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "9e39153b-35ba-4ad4-8f74-b357bc981026",
    },
  },
  // plugins: ["./expo-plugins/with-modify-gradle.js"],
});
