import Head from "next/head";

import { Audio } from "@dev/audio";
import { Hello } from "@dev/hello";

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
        <Audio />
        <Hello />
      </main>
    </>
  );
}
