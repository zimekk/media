import { EventHandler, useEffect, useRef, useState } from "react";

export function usePlayer({ uri }: { uri: string }) {
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
      const onPlay: EventHandler<any> = (e) => (
        console.log(["play"], e), setPlaying(true)
      );
      const onPause: EventHandler<any> = (e) => (
        console.log(["pause"], e), setPlaying(false)
      );

      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);

      return () => {
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
      };
    }
  }, [ref]);

  return { playing, play, pause, ref };
}
