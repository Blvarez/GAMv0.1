import "../styles/global.css";
import React from "react";
import type { AppProps } from 'next/app';

import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {

  /* const linkAttributes={
    rel: "preconnect",
    href:"https://fonts.googleapis.com",
    crossOrigin: "true" as const,
  }; */

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> {/* Se cambio el de true a "" que es anonymous no afecta en nada el codigo */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,200;1,600&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}