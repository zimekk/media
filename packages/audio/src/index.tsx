import { Suspense, useMemo, useState } from "react";
import { Button, Text, View } from "react-native";
import { suspend } from "suspend-react";
import styled from "styled-components/native";

import Player from "./Player";

const Title = styled.Text`
  color: orange;
  text-align: center;
  font-size: 16px;
`;

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
    <View>
      <View>
        <Text className="mt-4 text-lg">Text</Text>
        <Title>Title</Title>
      </View>
      {list.map(({ name, href }, key) => (
        <Button key={key} title={name} onPress={() => setHref(href)} />
      ))}
      {href && <Player key={href} uri={href} />}
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}

export function Audio() {
  return (
    <View>
      <Title>{`API_URL: ${NEXT_PUBLIC_API_URL}`}</Title>
      <Suspense fallback={<Loading />}>
        <Playlist />
      </Suspense>
    </View>
  );
}
