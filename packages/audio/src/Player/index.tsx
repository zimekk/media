import { Image, Text, Pressable, View } from "react-native";
import styled from "styled-components/native";

import { usePlayer } from "./hooks";

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
  const { playing, play, pause, ref } = usePlayer({ uri });

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
    </View>
  );
}
