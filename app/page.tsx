"use client";

import createImage from "@/actions/generatorApi";
import { FormEvent, useState } from "react";
import { Container } from "react-bootstrap";
import { Generate } from "../models/GeneratedImage";
import GeneratedImage from "./components/GeneratedImage";
import SuggestionInput from "./components/SuggestionInput";
import styles from "./page.module.css";

export default function Home() {
  // Url results array. Map this to the Generate types.
  const [urls, setUrls] = useState<Generate[] | null | void>(null);

  // Event handler to fetch generated URLs.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Setting the input type as a standard form Element.
    const data = new FormData(e.target as HTMLFormElement);
    const urlQuery = data.get("urlquery")?.toString().trim();

    // Performing fetch if it exists.
    if (urlQuery) {
      try {
        setUrls(null);
        // TODO: write out the function in the actions folder.
        const urls = await createImage(urlQuery);
        setUrls(urls);
      } catch (error) {
        console.error(error);
      } finally {
        // Add this when we have more.
      }
    }
  }

  return (
    <main className={styles.main} style={{ padding: "2rem" }}>
      <Container style={{ textAlign: "center", maxWidth: "30rem" }}>
        <SuggestionInput handleSubmit={handleSubmit} />
      </Container>
      <Container style={{ textAlign: "center" }}>
        <GeneratedImage />
      </Container>
    </main>
  );
}
