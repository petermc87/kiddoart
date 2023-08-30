"use client";

import createImage from "@/actions/generatorApi";
import { Generate } from "@/models/GeneratedImage";
import { FormEvent, useState } from "react";
import { Col, Container, Image } from "react-bootstrap";
import SuggestionInput from "./components/SuggestionInput";
import styles from "./page.module.css";

export default function Home() {
  // Url results array. Map this to the Generate types.
  const [urls, setUrls] = useState<Generate[] | void | null>(null);

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
        const results = await createImage(urlQuery);
        console.log(results);
        setUrls(results);
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
        {urls?.map((url) => {
          // Convert from b64 to url.
          const converted = `data:image/jped;base64,${url.b64_json}`;
          return (
            <Col xs={3} md={4}>
              <Image key={url.b64_json} src={converted} />
            </Col>
          );
        })}
      </Container>
    </main>
  );
}
