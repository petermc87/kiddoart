"use client";

import createImage from "@/actions/generatorApi";
import getAllImages from "@/actions/getAllImagesApi";
import { Generate } from "@/models/GeneratedImage";
import { ImageType } from "@/models/typings";
import { FormEvent, useEffect, useState } from "react";
import { Container, Image, Spinner } from "react-bootstrap";
import GeneratedImages from "./components/GeneratedImages";
import SuggestionInput from "./components/SuggestionInput";
import styles from "./page.module.css";

export default function Home() {
  // Url results array. Map this to the Generate types.
  const [urls, setUrls] = useState<Generate[] | void | null>(null);

  const [allImages, setAllImages] = useState<ImageType[] | void | null | any>(
    null
  );

  // Spinner state for generating image.
  const [creating, setCreating] = useState(false);

  // 1. Create a state variable for all images here.

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
        // The url of the image generated. NOTE this is plural because
        // the original thought was to have multiple images generated at once.
        setUrls(results);

        // Make another call to the database for all the images again.
        const images = await getAllImages();
        setAllImages(images);
      } catch (error) {
        console.error(error);
      }
    }
  }
  /// --> ALTERNATIVE (Try this first) --> Perform a UseEffect hook here instead of inside the GeneratedImages.
  // This makes more sense here because its what loads when the pages is visited and
  // when a new image gets created (the handle submit function for the image creation lives here.)
  // ORIGINAL CODE FOR FETCHING ALL IMAGES //
  // Create a hook for fetching.
  useEffect(() => {
    // Create an async function within the hook.
    const images = async () => {
      try {
        // Return a promise and store the results in a variable.
        const results = await getAllImages();

        // Set the state
        setAllImages(results);
      } catch (error) {
        console.error(error);
      }
    };
    // Call the function
    images();
  }, []);

  return (
    <main className={styles.main} style={{ padding: "2rem" }}>
      {/* 2 .. Suggestion input is where the images get called. */}
      {/* The response is then stored in a state variable and then passed  */}
      {/* down as props to generated images. */}
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
        <GeneratedImages images={allImages} />
      </Container>
    </main>
  );
}
