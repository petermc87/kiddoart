import { Button, Form } from "react-bootstrap";

export default function SuggestionInput({ handleSubmit }: any) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        {/* <div
          style={{
            alignItems: "center",

            maxWidth: "1000px",
            minWidth: "200px",
            position: "relative",
          }}
        >
          <div className={styles.content}>
            <div>KiddoArt</div>
            <div>KiddoArt</div>
          </div>
        </div> */}
        <Form.Label className="mb-3">
          What image do you want to create?
        </Form.Label>
        <Form.Control
          name="urlquery"
          placeholder="E.g. orange for my dog, lamp stuck in a door, cheese made for ardvarks..."
        />
        <Button type="submit" className="mb-3">
          Generate
        </Button>
      </Form.Group>
    </Form>
  );
}
