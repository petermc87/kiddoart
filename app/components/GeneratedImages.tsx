import { ImageType } from "@/models/typings";
import { Card, Col, Image, Row } from "react-bootstrap";
import styles from "./GeneratedImages.module.css";

type AllImagesProps = {
  images: ImageType[];
};

export default function GeneratedImages({ images }: AllImagesProps) {
  return (
    <>
      {images ? (
        <>
          <Row
            style={{ maxWidth: "100vw" }}
            xs={1}
            sm={2}
            xl={3}
            xxl={4}
            className="g-4"
          >
            {images.map((image: any) => {
              return (
                <Col key={image.url}>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title style={{ font: "cursive" }}>
                        Prompt
                      </Card.Title>
                      <Card.Text style={{ color: "black" }}>
                        {image.prompt}
                      </Card.Text>
                    </Card.Body>
                    <Image
                      src={image.url}
                      key={image.id}
                      alt="image"
                      rounded
                      className={`card-img-top ${styles.image}`}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        ""
      )}
    </>
  );
}

// ALTERNATIVE TO GETTING IMAGES //
// try {
//   const images = await getAllImages();
//   setAllImages(images);
// } catch (error) {
//   console.error(error);
// }

// ORIGINAL SETUP FOR GETTING ALL IMAGES //
// // Create state for images.
// const [allImages, setAllImages] = useState<ImageType[] | void | null | any>(
//   null
// );

// // ORIGINAL CODE FOR FETCHING ALL IMAGES //
// // Create a hook for fetching.
// useEffect(() => {
//   // Create an async function within the hook.
//   const images = async () => {
//     try {
//       // Return a promise and store the results in a variable.
//       const results = await getAllImages();
//       // Set the state
//       setAllImages(results);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // Call the function
//   images();
// }, []);
