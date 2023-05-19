import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Player({
  uri,
  loop = true,
}: {
  uri: string;
  loop: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  async function play() {
    if (ref.current) {
      ref.current.play();
    }
  }

  async function pause() {
    if (ref.current) {
      ref.current.pause();
    }
  }

  useEffect(() => {
    const audio = ref.current;
    if (audio) {
      const onPlay = (e) => (console.log(["play"], e), setPlaying(true));
      const onPause = (e) => (console.log(["pause"], e), setPlaying(false));

      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);

      return () => {
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
      };
    }
  }, [ref]);

  return (
    <View>
      {playing ? (
        <TouchableOpacity onPress={pause}>
          <Text>Pause</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={uri ? play : undefined}>
          <Text>Play</Text>
        </TouchableOpacity>
      )}
      <audio ref={ref} src={uri} loop={loop} autoPlay controls />
    </View>
  );
}
