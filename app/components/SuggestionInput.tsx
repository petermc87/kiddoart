import { Form } from "react-bootstrap";
import styles from "./button.module.css";

export default function SuggestionInput({ handleSubmit }: any) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label className="mb-4">
          What image do you want to create?
        </Form.Label>
        <Form.Control
          name="urlquery"
          placeholder="E.g. orange for my dog, lamp stuck in a door, cheese made for ardvarks..."
          className="mb-4"
        />
        <button type="submit" className={styles.button} role="button">
          Generate
        </button>
        {/* <Button type="submit" className="mb-4">
          Generate
        </Button> */}
      </Form.Group>
    </Form>
  );
}
