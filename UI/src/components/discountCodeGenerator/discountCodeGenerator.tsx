import "./discountCodeGenerator.css";
import "assets/css/shared.css";

import { useEffect, useState } from "react";
import Connector from "services/generateDiscountCodeConnection";
import { GenerateResponse } from "models/generateResponse";
import { GenerateRequest } from "models/generateRequest";
import { Form, Row, Col, Button } from "react-bootstrap";

const DiscountCodeGenerator = () => {
  const { generateDiscountCode, events } = Connector();
  const [generateResponse, setGenerateResponse] = useState({} as GenerateResponse);

  const [count, setCount] = useState("");
  const [length, setLength] = useState(7);

  useEffect(() => {
    events((response) => setGenerateResponse(response));
  }, []);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    generateDiscountCode({ count: parseInt(count, 10), length: length } as GenerateRequest);
  };

  return (
    <Form onSubmit={onSubmit} className="discountCodeGeneratorForm">
      <Row className="action-section">
        <Col>
          <h3 className="title">GENERATE DISCOUT CODES</h3>
        </Col>
        <Col>
          <Form.Group>
            <div className="micro-text">Select lenght of the code</div>
            <Button
              className="button"
              onClick={() => setLength(7)}
              style={length === 7 ? { backgroundColor: "rgba(49, 36, 25)", color: "white" } : {}}
            >
              7
            </Button>
            <Button
              className="button"
              onClick={() => setLength(8)}
              style={length === 8 ? { backgroundColor: "rgba(49, 36, 25)", color: "white" } : {}}
            >
              8
            </Button>
            <div className="micro-text">Select number of codes to generate</div>
            <Form.Control
              className="input"
              type="number"
              placeholder="LENGHT"
              onChange={(e) => setCount(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="button-area">
        <Button className="submit" variant="success" type="submit">
          GENERATE
        </Button>
      </Row>
      <Row>
        <div className="result">
          {generateResponse.result === undefined
            ? "Codes were not generated"
            : generateResponse.result
            ? "Codes generated SUCCESSFULLY"
            : "Issues generating codes"}
        </div>
      </Row>
    </Form>
  );
};

export default DiscountCodeGenerator;
