import { ImageType } from "@/models/typings";
import { useRef, useState } from "react";
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

  // Create a useRef to get the previous value.
  const prevValue = useRef(0);

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
                  // NOTE: There is no need to create a seperate component for this.
                  // This is because it is not being reused anywhere else.
                  // FIX: it is showing the all the images bar the last one.
                  // It starts off with 8, then increments by 4.
                  <Col key={image.url}>
                    <Card
                      className="h-100"
                      id={styles.card}
                      style={{ boxShadow: "0 0 10px 1px rgb(202, 202, 202)" }}
                    >
                      <Card.Body>
                        <Card.Title style={{ font: "cursive" }}>
                          {image.prompt}
                        </Card.Title>
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
          // Use a conditional to check if the values are equal. Create another
          // state variable to change the direction of the picture reveal i.e
          // is it going in the negative direction or positive?
          //
          // TESTING THE IMAGE RENDERING ON CLICK.
          // console.log(
          //   `Previous Val: ${prevValue.current}\n
          //   Number of Images: ${numOfImages}\n
          //   Length Of Images: ${images.length}`
          // );

          // If the length of the images.length array is greater than the numOfImages,
          // and the previous value is less (incrementing down) then the number of images,
          // then we have to be adding more images.
          // DOWN DIRECTION
          if (
            images &&
            images.length > numOfImages &&
            prevValue.current < numOfImages
          ) {
            setNumOfImages(numOfImages + 4);
            // Always set the previous after each increment
            prevValue.current = numOfImages;
            // Otherwise, we are removing images i.e. showing less
            // UP DIRECTION
          } else {
            setNumOfImages(numOfImages - 4);
            // This means if we get the the base amount of images, which is 8 (12 before the next click
            // shown in the line above, hence the 12 in the conditional below), the prevValue is reset
            if (numOfImages === 12) {
              prevValue.current = 0;
            } else {
              prevValue.current = numOfImages;
            }
          }
        }}
      >
        {/* Use the same conditional logic as in the click funtion.*/}
        {images &&
        images.length > numOfImages &&
        prevValue.current < numOfImages ? (
          <div className={styles.chevronDown}></div>
        ) : (
          <div className={styles.chevronUp}></div>
        )}
      </div>
    </>
  );
}
