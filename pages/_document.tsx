import { Html, Head, Main, NextScript } from "next/document";
import Favicon from "./favicon";

export default function Document() {
  return (
    <Html className="dark" data-theme="dark">
      <Head>
        <Favicon />
      </Head>
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
