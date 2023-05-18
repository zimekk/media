import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { Audio } from "@dev/audio";
import { Hello } from "@dev/hello";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
const Title = styled.Text`
  color: red;
  text-align: center;
  font-size: 16px;
`;

export default function () {
  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <View className="py-2">
          <Text className="font-semibold italic text-white">
            Press on a post
          </Text>
          <Title>Hello</Title>
          <Container>
            <Title>Hello</Title>
          </Container>
          <Audio />
          {/* <Hello /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
