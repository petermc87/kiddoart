import { Container, Image } from "react-bootstrap";

import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <Container
      style={{
        textAlign: "center",
        justifyContent: "center",
        marginBottom: "4rem",
      }}
    >
      <Image
        style={{ textAlign: "center", maxWidth: "8rem", minHeight: "8rem" }}
        src="https://kiddoart-images.s3.amazonaws.com/Screenshot+from+2023-10-02+10-45-49.png"
      />
      <h1 className={styles.logo}>
        <span id={styles.k}>K</span>
        <span id={styles.i}>I</span>
        <span id={styles.d_1}>D</span>
        <span id={styles.d_2}>D</span>
        <span id={styles.o}>O</span>
        <span id={styles.a}>A</span>
        <span id={styles.r}>R</span>
        <span id={styles.t}>T</span>
      </h1>
    </Container>
  );
}
