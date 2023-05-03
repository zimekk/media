import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

export default function () {
  // https://docs.expo.dev/versions/latest/sdk/audio/#playing-sounds
  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/Hello.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <View className="py-2">
          <Text className="font-semibold italic text-white">
            Press on a post
          </Text>
          <Button title="Play Sound" onPress={playSound} />
        </View>
      </View>
    </SafeAreaView>
  );
}
