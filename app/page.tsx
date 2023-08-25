"use client";

import { Container } from "react-bootstrap";
import GeneratedImage from "./components/GeneratedImage";
import SuggestionInput from "./components/SuggestionInput";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Container>
      <main className={styles.main}>
        <Container style={{ textAlign: "center" }}>
          <SuggestionInput />
        </Container>
        <Container style={{ textAlign: "center" }}>
          <GeneratedImage />
        </Container>
      </main>
    </Container>
  );
}
