import Head from "next/head";
import React from "react";
import styles from "styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chit-Chat</title>
      </Head>
      <main className={styles.main}>
        <h1>Testing</h1>
      </main>
    </>
  );
}
