import { Dispatch, SetStateAction, useMemo } from "react";
import { FlatList, Text, Pressable } from "react-native";
import { suspend } from "suspend-react";
import styled from "styled-components/native";

const StyledView = styled.View``;

// https://docs.expo.dev/guides/environment-variables/#using-babel-to-inline-environment-variables-during-build-time
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

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
    <StyledView>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Pressable onPress={() => setHref(item.href)}>
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
          </Pressable>
        )}
      />
    </StyledView>
  );
}
