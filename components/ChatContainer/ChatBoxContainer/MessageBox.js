import React from "react";
import styles from "/styles/MessageBox.module.css";

export default function MessageBox({ username, name, message }) {
  return (
    <div
      className={`d-flex align-item-center ${
        username === name && "justify-content-end text-right"
      }`}
    >
      <div className="px-2">
        <span className="name">{name}</span>
        <p className={styles.MessageBox}>{message}</p>
      </div>
    </div>
  );
}
