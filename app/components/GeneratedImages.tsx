import { ImageType } from "@/models/typings";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import styles from "./GeneratedImages.module.scss";

type AllImagesProps = {
  images: ImageType[];
  setPrompt: Dispatch<SetStateAction<string | void | undefined>>;
  setImage: Dispatch<SetStateAction<string | void | null | undefined>>;
  setId: Dispatch<SetStateAction<string | void | null | undefined>>;
};

export default function GeneratedImages({
  images,
  setImage,
  setPrompt,
  setId,
}: AllImagesProps) {
  // Create a state the stores the number of images to index.
  //  This will mean that it will only render 8 at a time. When the chevron at
  //  the bottom of the screen is clicked, 8 is added to the state, therefore
  //  rendering 8 + 8 + ...
  const [numOfImages, setNumOfImages] = useState(8);

  // This is to activeate the max limit reached for image rendering.
  const [limitMessage, setLimitMessage] = useState(false);

  // Create a useRef to get the previous value.
  const prevValue = useRef(0);

  //Max render iteration.
  const maxRenderIteration = useRef(0);

  // Create a handler function for viewing the image selected.
  const handleView = (url: string, prompt: string, id: string, e: any) => {
    e.preventDefault();
    setImage(url);
    setPrompt(prompt);
    setId(id);
  };

  // When the numOfImages ends up being greater than the images.length,
  // you can set the limit message to true.
  const checkLimit = (e: any) => {
    e.preventDefault();
    if (images && maxRenderIteration.current > images.length) {
      setLimitMessage(true);
      maxRenderIteration.current = 0;
    } else {
      setLimitMessage(false);
    }
  };

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
              // OBSERVATION: The length of the images object is 59, and the iteration for each image reveal is 4,
              // so the max number the numOfImage will reach is 60. This is greater than 59,
              // which is the total number of images in the list. This is why we need to use
              // less than conditional rather than less than or equal to.
              // If the current index (i) is less than or equal to the state
              // value, then render to the screen.
              // NOTE: There is no need to create a seperate component for this.
              // This is because it is not being reused anywhere else.
              if (i < numOfImages) {
                // TESTING IF ALL IMAGES ARE BEING RENDERED.
                // console.log(
                //   `Current Iteration: ${i}, Current Title: ${image.prompt}`
                // );
                return (
                  <Col key={image.url}>
                    <Card
                      className="h-100"
                      id={styles.card}
                      style={{ boxShadow: "0 0 10px 1px rgb(202, 202, 202)" }}
                      onClick={(e) =>
                        handleView(image.url, image.prompt, image.id, e)
                      }
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
      {/* // Message when the limit to the number of renderings is reached. */}
      {limitMessage ? (
        <div className={styles.limitMessage}>
          You have reached the max limit of images to display. Please use the up
          arrow to hide images.
        </div>
      ) : (
        ""
      )}
      {/* On click will add to the current state i.e. current state + 4 */}
      <div
        className={styles.chevronWrapper}
        onClick={(e) => {
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
            // Set the max iteration here, which will be the max on the last round of
            // looping the downward rendering.
            maxRenderIteration.current = numOfImages + 4;
          } else {
            // For the first up direction, set a state that will render a message at the bottom.
            setNumOfImages(numOfImages - 4);
            // This means if we get the the base amount of images, which is 8 (12 before the next click
            // shown in the line above, hence the 12 in the conditional below), the prevValue is reset
            if (numOfImages === 12) {
              prevValue.current = 0;
            } else {
              prevValue.current = numOfImages;
            }
          }
          checkLimit(e);
        }}
      >
        {/* Use the same conditional logic as in the click funtion.*/}
        {images &&
        images.length > numOfImages &&
        prevValue.current < numOfImages ? (
          <div className={styles.chevronDown}></div>
        ) : (
          <>
            <div className={styles.chevronUp}></div>
          </>
        )}
      </div>
    </>
  );
}
