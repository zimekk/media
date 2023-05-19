import { Suspense, useMemo, useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { suspend } from "suspend-react";
import styled from "styled-components/native";

import Player from "./Player";

const Title = styled.Text`
  color: orange;
  text-align: center;
  font-size: 16px;
`;

const StyledScrollView = styled.ScrollView``;

function Loading() {
  return (
    <View>
      <Title>Loading...</Title>
    </View>
  );
}

// https://docs.expo.dev/guides/environment-variables/#using-babel-to-inline-environment-variables-during-build-time
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

function Playlist({ version = 1 }) {
  const [href, setHref] = useState<string | undefined>();
  const data = suspend(async () => {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/audio?${version}`);
    return res.json() as Promise<string[]>;
  }, [version]);

  const list = useMemo(
    () =>
      (data || []).map((name) => ({
        name,
        href: `${NEXT_PUBLIC_API_URL}/api/audio/${encodeURIComponent(name)}`,
      })),
    [data]
  );

  console.log({ list });

  return (
    <View
      style={{
        flex: 1,
        // position: 'relative',
        // flexDirection: 'row'
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "yellow",
        }}
      >
        <Text>1</Text>
        <StyledScrollView style={{ borderColor: "red" }}>
          {list.map((item, key) => (
            <TouchableOpacity key={key} onPress={() => setHref(item.href)}>
              <Text
                style={
                  href === item.href
                    ? {
                        backgroundColor: "coral",
                      }
                    : {}
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </StyledScrollView>
      </View>
      <View
        style={{
          backgroundColor: "orange",
          // flex: 2
        }}
      >
        <Text>2</Text>
        {href && <Player key={href} uri={href} />}
      </View>
      {/* <Title style={{
          position: 'absolute'
        }}>Title</Title> */}
      {/* <View style={{flex:1, position: 'fixed'}}> */}
      {/* <Text className="mt-4 text-lg">Text</Text> */}
      {/* </View> */}
      {/* <View style={{flex:1}}> */}
      {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
      {/* </View> */}
    </View>
  );
}

export function Audio() {
  return (
    <Suspense fallback={<Loading />}>
      {/* <View> */}
      {/* <Title>{`API_URL: ${NEXT_PUBLIC_API_URL}`}</Title> */}
      <Playlist />
      {/* </View> */}
    </Suspense>
  );
}
