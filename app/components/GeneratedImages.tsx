import { ImageType } from "@/models/typings";
import { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import styles from "./GeneratedImages.module.scss";

type AllImagesProps = {
  images: ImageType[];
};

export default function GeneratedImages({ images }: AllImagesProps) {
  // Create a state the stores the number of images to index.
  //  This will mean that it will only render 8 at a time. When the chevron at
  //  the bottom of the screen is clicked, 8 is added to the state, therefore
  //  rendering 8 + 8 + ...
  const [numOfImages, setNumOfImages] = useState(8);

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
            {images.map((image: any, i) => {
              // Create a separate component for the image.
              // To create the
              if (i < numOfImages) {
                return (
                  // If the current index (i) is less than or equal to the state
                  // value, then render to the screen.
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
              }
            })}
          </Row>
          <></>
        </>
      ) : (
        ""
      )}
      {/* On click will add to the current state i.e. current state + 4 */}
      <div
        className={styles.chevronWrapper}
        onClick={() => {
          setNumOfImages(numOfImages + 4);
        }}
      >
        <div className={styles.chevron}></div>
      </div>
    </>
  );
}
