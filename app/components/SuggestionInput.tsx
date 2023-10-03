import { Form } from "react-bootstrap";
import GeneralButton from "./Button/GeneralButton";
import styles from "./Suggestion.module.scss";
export default function SuggestionInput({ handleSubmit }: any) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          id={styles.input}
          name="urlquery"
          placeholder="Type what you want to create here..."
          className="mb-5"
          style={{
            borderRadius: "5px 5px 0 0",
            borderTop: "solid #ffffff",
            borderLeft: "solid #ffffff",
            borderRight: "solid #ffffff",
            borderBottom: "solid #d2a800",
            textAlign: "center",
            color: " solid #d2a800",
            padding: "0.6rem",
          }}
          required
        />

        <GeneralButton />
      </Form.Group>
    </Form>
  );
}
