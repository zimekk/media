import { useEffect, useState } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

export function usePlayer({ uri }: { uri: string }) {
  // https://docs.expo.dev/versions/latest/sdk/audio/#playing-sounds
  const [sound, setSound] = useState<Audio.Sound>();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  async function play() {
    try {
      console.log("Requesting permissions..");
      // await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      console.log("Loading Sound");
      // https://docs.expo.dev/versions/latest/sdk/av/#constants
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { isLooping: true, shouldPlay: true }
      );
      setSound(sound);

      const status = await sound.getStatusAsync();
      setDuration(status.durationMillis / 1000);

      console.log({ status });

      const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) =>
        setCurrentTime(status.positionMillis / 1000);

      sound.setStatusAsync({ progressUpdateIntervalMillis: 200 });
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

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

  return { playing, play, pause, ref: undefined, currentTime, duration };
}
