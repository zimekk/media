import { Image, Text, Pressable, View } from "react-native";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import styled from "styled-components/native";

import { usePlayer } from "./hooks";

dayjs.extend(duration);

const URI_SLASH = "%2F";
const getImgUri = (uri: string) =>
  ((m) => m.slice(0, m.length - 1).concat("cover.jpg"))(
    uri.split(URI_SLASH)
  ).join(URI_SLASH);

const StyledButton = styled.View``;

export default function Player({
  uri,
  loop = true,
}: {
  uri: string;
  loop?: boolean;
}) {
  const { playing, play, pause, ref, currentTime, duration } = usePlayer({
    uri,
  });

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          backgroundColor: "green",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: getImgUri(uri),
            width: 100,
            height: 100,
          }}
          style={{}}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "red",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <StyledButton>
            {playing ? (
              <Pressable onPress={pause}>
                <Text>Pause</Text>
              </Pressable>
            ) : (
              <Pressable onPress={play}>
                <Text>Play</Text>
              </Pressable>
            )}
          </StyledButton>
          {ref && <audio ref={ref} src={uri} loop={loop} autoPlay controls />}
        </View>
        {duration > 0 && (
          <View
            style={{
              position: "relative",
              backgroundColor: "blue",
            }}
          >
            <View
              style={{
                position: "absolute",
                backgroundColor: "violet",
                left: `${0}%`,
                right: `${100 - (100 * currentTime) / duration}%`,
                top: 5,
                bottom: 5,
              }}
            ></View>
            <Text
              style={{
                height: 24,
              }}
            >{`${dayjs
              .duration(currentTime, "seconds")
              .format("m:ss")} / ${dayjs
              .duration(duration, "seconds")
              .format("m:ss")}`}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
