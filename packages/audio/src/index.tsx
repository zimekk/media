import { Suspense, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

import Player from "./Player";
import Playlist from "./Playlist";

const StyledText = styled.Text`
  color: orange;
  text-align: center;
  font-size: 16px;
`;

function Loading() {
  return (
    <View>
      <StyledText>Loading...</StyledText>
    </View>
  );
}

export function Audio() {
  const [href, setHref] = useState<string | undefined>();

  return (
    <Suspense fallback={<Loading />}>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "yellow",
          }}
        >
          <Playlist href={href} setHref={setHref} />
        </View>
        <View
          style={{
            backgroundColor: "orange",
          }}
        >
          {href && <Player key={href} uri={href} />}
        </View>
      </View>
    </Suspense>
  );
}
