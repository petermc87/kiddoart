"use client";

import createImage from "@/actions/generatorApi";
import getAllImages from "@/actions/getAllImagesApi";
import { Generate } from "@/models/GeneratedImage";
import { ImageType } from "@/models/typings";
import {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Container, Spinner } from "react-bootstrap";
import Footer from "./components/Footer/Footer";
import GeneratedImages from "./components/GeneratedImages";
import ImageContainer from "./components/ImageContainer/ImageContainer";
import Logo from "./components/Logo/Logo";
import SuggestionInput from "./components/SuggestionInput";
import styles from "./page.module.scss";

export default function Home() {
  // Reference for image container.
  const imageRef = useRef(null);

  // Spinner state for generating image.
  const [creating, setCreating] = useState(false);

  //Create a state variable for all images here.
  const [allImages, setAllImages] = useState<ImageType[] | void | null | any>(
    null
  );

  // Add query state so it can be passed into the viewed image component.
  const [imagePrompt, setImagePrompt] = useState<string | undefined | void>("");

  // Add state for current viewing image.
  const [currentImage, setCurrentImage] = useState<
    string | undefined | void | null
  >("");

  // Set id. NOTE: We are separating out the URL, id etc so that an image can be rendered
  // as the current image on ceration (this only genrates a URL).
  const [id, setId] = useState<string | undefined | void | null>("");

  // The scroll into view used to view the image selected in the current image container.
  // NOTE: The ref useRef object is passed in here from the image selected rather
  // than from this page so that types could be maintained.
  const refHandleClick = (reference: MutableRefObject<null | any>) => {
    reference.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Event handler to fetch generated URLs.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Setting the input type as a standard form Element.
    const data = new FormData(e.target as HTMLFormElement);
    const urlQuery = data.get("urlquery")?.toString().trim();

    // Set the curren prompt to be rendered to the screen

    setImagePrompt(urlQuery);
    // Performing fetch if it exists.
    if (urlQuery) {
      try {
        setCurrentImage(null);
        setCreating(true);
        const results = await createImage(urlQuery);

        // Set the urls to Generate type, then pull out the url.
        const arrayData: Generate[] | void | null = results;

        // TS error will show up if you check for an index in an array that hasnt been
        // generated yet!
        if (arrayData) {
          // Pull out the url.
          const imageData: string | undefined | void = arrayData[0].b64_json;
          // Convert it to a JPEG.
          const convertedUrl = `data:image/jpeg;base64,${imageData}`;

          // Make another call to the database for all the images again.
          const images = await getAllImages();
          setAllImages(images);

          // TASK: Add a set timeout function here to set the url but only if its a new
          // image being generated. A hook could be used to determine which one it is.
          // The hook can be declared here, assigned in GeneratedImages (false), and
          // in SuggestionsInput (false).
          setTimeout(() => {
            setCreating(false);
            setCurrentImage(convertedUrl);
          }, 11000);
        }
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
    <main className={styles.main}>
      {/* Hero image, generated image and prompt container. */}
      <Container
        style={{
          textAlign: "center",
          maxWidth: "1000px",
          minWidth: "200px",
          flexDirection: "column",
        }}
      >
        <Container
          style={{
            textAlign: "center",
            maxWidth: "30rem",
            minHeight: "10rem",
            alignItems: "center",
          }}
          className="mt-5"
        >
          <Logo />
        </Container>

        {/* INPUT CONTAINER */}
        <Container
          style={{
            textAlign: "center",
            maxWidth: "35rem",
            padding: "0",
          }}
          className="mb-5"
        >
          <SuggestionInput handleSubmit={handleSubmit} />
        </Container>

        {/* SPINNER AND IMAGE CONTAINER. */}
        <Container
          style={{
            textAlign: "center",
            maxWidth: "1000px",
            minWidth: "200px",
            alignItems: "center",
            padding: "0",
          }}
          className="mb-5"
        >
          {/* Spinner will be active when it is creating*/}
          {creating && (
            <Spinner
              animation="border"
              style={{ width: "10rem", height: "10rem" }}
            />
          )}
          {currentImage ? (
            <>
              {/* CURRENT IMAGE CONTAINER */}
              {/* Pass down the url, converted, imagePrompt */}
              <ImageContainer
                url={currentImage}
                imagePrompt={imagePrompt}
                id={id}
                imageRef={imageRef}
              />
            </>
          ) : (
            <h5 style={{ color: "gray" }}>
              No image to display yet (Please wait 15 seconds for image to
              generate)
            </h5>
          )}
        </Container>
      </Container>
      <br />
      <br />

      {/* ALL PREVIOUS IMAGES */}
      <Container
        className="mb-5"
        style={{ textAlign: "center", maxWidth: "85rem" }}
      >
        <h3 className={styles.heading}>Choose from Previously Generated</h3>
        <br />
        {/* Pass down the imageRef and the click handler for the scroll into view. */}
        <GeneratedImages
          images={allImages}
          setPrompt={setImagePrompt}
          setImage={setCurrentImage}
          setId={setId}
          refHandleClick={refHandleClick}
          reference={imageRef}
        />
      </Container>
      <Container style={{ textAlign: "center", padding: "0" }}>
        <Footer />
      </Container>
    </main>
  );
}
