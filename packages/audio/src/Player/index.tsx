import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

export default function Player({ uri }: { uri: string }) {
  // https://docs.expo.dev/versions/latest/sdk/audio/#playing-sounds
  const [sound, setSound] = useState<Audio.Sound>();
  const [playing, setPlaying] = useState(false);

  async function play() {
    try {
      console.log("Requesting permissions..");
      // await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
      setPlaying(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }
  async function pause() {
    if (sound) {
      setPlaying(false);
      sound.pauseAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (uri) {
      play();
    }
  }, [uri]);

  return (
    <View>
      {playing ? (
        <TouchableOpacity onPress={pause}>
          <Text>Pause</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={play}>
          <Text>Play</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
