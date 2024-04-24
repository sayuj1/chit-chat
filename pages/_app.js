import "bootstrap/dist/css/bootstrap.css";
import Layout from "components/Layout/Layout";
import { useEffect } from "react";
import "styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
