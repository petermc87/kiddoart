import { Button, Form } from "react-bootstrap";

export default function SuggestionInput() {
  return (
    <Form>
      <Form.Group>
        <Form.Label>What image do you want to create?</Form.Label>
        <Form.Control
          name="query"
          placeholder="E.g. orange for my dog, lamp stuck in a door, cheese made for ardvarks..."
        />
        <Button>Generate</Button>
      </Form.Group>
    </Form>
  );
}
