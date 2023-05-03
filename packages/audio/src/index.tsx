import { ComponentProps, useEffect, useMemo, useState } from "react";
// import { Text, View } from "react-native";

const Text = "div";
const View = "div";

function Loading() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function Player({ src, autoPlay, ...props }: ComponentProps<"audio">) {
  return <audio src={src} autoPlay={autoPlay} {...props} />;
}

// https://docs.expo.dev/guides/environment-variables/#using-babel-to-inline-environment-variables-during-build-time
const { API_URL = "" } = process.env;

export function Audio() {
  const [data, setData] = useState<string[] | null>(null);
  const [href, setHref] = useState<string | undefined>();

  useEffect(() => {
    fetch(`${API_URL}/api/audio`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, []);

  const list = useMemo(
    () =>
      (data || []).map((name) => ({
        name,
        href: `api/audio/${encodeURIComponent(name)}`,
      })),
    [data]
  );

  if (data === null) return <Loading />;

  return (
    <View>
      <Text>{`API_URL: ${API_URL}`}</Text>
      <Player src={href} autoPlay controls loop />
      <ul>
        {list.map(({ name, href }, key) => (
          <li key={key}>
            <a href={href} onClick={(e) => (e.preventDefault(), setHref(href))}>
              {name}
            </a>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </View>
  );
}
