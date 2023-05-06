import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "@dev/audio";
import { Hello } from "@dev/hello";

export default function () {
  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <View className="py-2">
          <Text className="font-semibold italic text-white">
            Press on a post
          </Text>
          <Audio />
          <Hello />
        </View>
      </View>
    </SafeAreaView>
  );
}
