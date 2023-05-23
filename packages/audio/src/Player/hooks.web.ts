import { EventHandler, useEffect, useRef, useState } from "react";

export function usePlayer({ uri }: { uri: string }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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
      // https://www.w3schools.com/tags/av_event_loadedmetadata.asp
      const onLoadedMetadata: EventHandler<any> = (e) => (
        console.log(["loadedmetadata"], e, audio.currentTime, audio.duration),
        setCurrentTime(audio.currentTime),
        setDuration(audio.duration)
      );
      const onPlay: EventHandler<any> = (e) => (
        console.log(["play"], e), setPlaying(true)
      );
      const onPause: EventHandler<any> = (e) => (
        console.log(["pause"], e), setPlaying(false)
      );
      const onTimeUpdate: EventHandler<any> = (e) =>
        setCurrentTime(audio.currentTime);

      audio.addEventListener("loadedmetadata", onLoadedMetadata);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      audio.addEventListener("timeupdate", onTimeUpdate);

      return () => {
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
        audio.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, [ref]);

  return { playing, play, pause, ref, currentTime, duration };
}
