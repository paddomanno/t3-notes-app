/**
 * override the default Document
 * see: https://nextjs.org/docs/advanced-features/custom-document
 */

import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="coffee">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
