"use client";

import createImage from "@/actions/generatorApi";
import { Generate } from "@/models/GeneratedImage";
import { FormEvent, useState } from "react";
import { Container, Image, Spinner } from "react-bootstrap";
import GeneratedImages from "./components/GeneratedImages";
import SuggestionInput from "./components/SuggestionInput";
import styles from "./page.module.css";

export default function Home() {
  // Url results array. Map this to the Generate types.
  const [urls, setUrls] = useState<Generate[] | void | null>(null);

  // Spinner state for generating image.
  const [creating, setCreating] = useState(false);

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
        setCreating(true);
        const results = await createImage(urlQuery);
        setCreating(false);
        setUrls(results);
      } catch (error) {
        console.error(error);
      } finally {
        // Add this when we have more.
      }
    }

    // Add useEffect here to updated state for all images.
    // These can then be passed as props down to generated images. -> this is to
    // avoid having to refresh after a new image is added to the db.
    // Use the SuggestionInput as a guide for passing props.
  }

  return (
    <main className={styles.main} style={{ padding: "2rem" }}>
      <Container style={{ textAlign: "center", maxWidth: "30rem" }}>
        <SuggestionInput handleSubmit={handleSubmit} />
      </Container>
      <Container
        style={{ textAlign: "center", maxWidth: "1000px", minWidth: "200px" }}
      >
        {/* Spinner will be active when it is searching */}
        <div className="d-flex flex-column align-items-center">
          {creating && (
            <Spinner
              animation="border"
              style={{ width: "10rem", height: "10rem" }}
            />
          )}
        </div>
        {urls?.map((url) => {
          // Convert from b64 to url.
          const converted = `data:image/jpeg;base64,${url.b64_json}`;
          return (
            <div className={styles.container} key={url.b64_json}>
              <Image key={url.b64_json} src={converted} alt="image" />
            </div>
          );
        })}
      </Container>
      <br />
      <br />
      <Container style={{ textAlign: "center", maxWidth: "30rem" }}>
        <h3>Previous Images</h3>
        <GeneratedImages />
      </Container>
    </main>
  );
}
