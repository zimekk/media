import { Dispatch, SetStateAction, useMemo } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { suspend } from "suspend-react";
import styled from "styled-components/native";

const StyledView = styled.View``;

// https://docs.expo.dev/guides/environment-variables/#using-babel-to-inline-environment-variables-during-build-time
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface ItemType {
  name: string;
  year?: string;
  album?: string;
  title?: string;
  artists?: string[];
  picture?: string[];
}

export default function Playlist({
  version = 1,
  href,
  setHref,
}: {
  version?: number;
  href?: string;
  setHref: Dispatch<SetStateAction<string | undefined>>;
}) {
  const data = suspend(async () => {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/audio?${version}`);
    return res.json() as Promise<ItemType[]>;
  }, [version]);

  const list = useMemo(
    () =>
      (data || [])
        .map((name) => (typeof name === "string" ? { name } : name))
        .map(({ name, ...rest }) => ({
          ...rest,
          name,
          href: `${NEXT_PUBLIC_API_URL}/api/audio/${encodeURIComponent(name)}`,
        })),
    [data]
  );

  // console.log({ list });

  return (
    <StyledView>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Pressable onPress={() => setHref(item.href)}>
            <View
              style={{
                flexDirection: "row",
                padding: 1,
                backgroundColor: href === item.href ? "coral" : "transparent",
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "silver",
                }}
              >
                {item.picture &&
                  item.picture.slice(0, 1).map((uri, key) => (
                    <Image
                      key={key}
                      source={{
                        uri,
                        width: 50,
                        height: 50,
                      }}
                      style={{}}
                    />
                  ))}
              </View>
              <View>
                <Text
                  style={{
                    padding: 1,
                  }}
                >
                  {`${item.album ? `${item.album} / ` : ""}${
                    item.title || item.name
                  }`}
                </Text>
                {item.artists && (
                  <Text
                    style={{
                      padding: 1,
                    }}
                  >
                    {`${item.year} - ${item.artists?.join(", ")}`}
                  </Text>
                )}
              </View>
            </View>
          </Pressable>
        )}
      />
    </StyledView>
  );
}
