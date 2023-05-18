import Head from "next/head";

import { Text, View } from "react-native";

// import styled from 'styled-components';
import styled from "styled-components/native";

import { Audio } from "@dev/audio";
import { Hello } from "@dev/hello";

// const View = 'div'
// const Text = 'div'

// const SkeletonImg = styled.div`
//   height: 3.5rem /* 56px */;
//   border-radius: 0.5rem /* 8px */;
//   background-color: rgb(63 63 70 / 1);
// `;

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, minmax(0, 1fr));
//   gap: 1.5rem /* 24px */;
// `;

// const SkeletonInner = styled.div`
//   padding: 1rem /* 16px */;
//   background-color: rgb(24 24 27 / 0.8);
//   border-radius: 1rem /* 16px */;
// `;

// const Skeleton = () => (
//   <SkeletonInner>
//     <SkeletonImg />
//   </SkeletonInner>
// );

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

export default function Web() {
  return (
    <>
      <Head>
        <title>media</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Web</h1>
        {/* <Container>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Container> */}
        <h1 className="text-xl font-medium text-gray-400/80">
          Styled with Styled Components
        </h1>
        <Container>
          <Title>Hello</Title>
        </Container>
        <Text className="font-semibold italic text-white">Press on a post</Text>
        <View>
          <Text className="mt-4 text-lg">Text</Text>
        </View>
        <Audio />
        <Hello />
      </main>
    </>
  );
}
