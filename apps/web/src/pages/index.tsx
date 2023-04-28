import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
// import { signIn, signOut } from "next-auth/react";

import { Hello } from "@dev/hello";
// import { Music } from "@dev/music";

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
      <Hello/>
    </main>
    </>
  );
}
