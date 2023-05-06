import { Suspense, useMemo, useState } from "react";
import { Button, Text, View } from "react-native";
import { suspend } from "suspend-react";

import Player from "./Player";

function Loading() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// https://docs.expo.dev/guides/environment-variables/#using-babel-to-inline-environment-variables-during-build-time
const { API_URL = "" } = process.env;

function Playlist({ version = 1 }) {
  const [href, setHref] = useState<string | undefined>();
  const data = suspend(async () => {
    const res = await fetch(`${API_URL}/api/audio?${version}`);
    return res.json() as Promise<string[]>;
  }, [version]);

  const list = useMemo(
    () =>
      (data || []).map((name) => ({
        name,
        href: `${API_URL}/api/audio/${encodeURIComponent(name)}`,
      })),
    [data]
  );

  console.log({ list });

  return (
    <View>
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
      <Text>{`API_URL: ${API_URL}`}</Text>
      <Suspense fallback={<Loading />}>
        <Playlist />
      </Suspense>
    </View>
  );
}
