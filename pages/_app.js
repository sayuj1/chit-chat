import "bootstrap/dist/css/bootstrap.css";
import Layout from "components/Layout/Layout";
import Head from "next/head";
import { useEffect } from "react";
import "styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
