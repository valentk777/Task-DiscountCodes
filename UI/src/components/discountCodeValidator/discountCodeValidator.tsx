import "./discountCodeValidator.css";
import "assets/css/shared.css";

import { useEffect, useState } from "react";
import Connector from "services/validateDiscountCodeConnection";
import { UseCodeResponse } from "models/useCodeResponse";
import { UseCodeRequest } from "models/useCodeRequest";
import { Form, Row, Col, Button } from "react-bootstrap";

const DiscountCodeValidator = () => {
  const { validateDiscountCode, events } = Connector();
  const [validateCodeResponse, setValidateCodeResponse] = useState({} as UseCodeResponse);

  const [code, setCode] = useState("");

  useEffect(() => {
    events((response) => setValidateCodeResponse(response));
  }, []);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    validateDiscountCode({ code: code } as UseCodeRequest);
  };

  return (
    <Form onSubmit={onSubmit} className="discountCodeValidatorForm">
      <Row className="action-section">
        <Col>
          <h3 className="title">USE YOUR DISCOUNT CODE</h3>
        </Col>
        <Col>
          <Form.Group>
            <div className="micro-text">Enter your discount code</div>
            <Form.Control
              className="input"
              placeholder="CODE"
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="button-area">
        <Button className="submit" type="submit">
          VALIDATE
        </Button>
      </Row>
      <Row>
        <Col>
          <div className="result">
            {validateCodeResponse.result === undefined
              ? "Not validated"
              : validateCodeResponse.result === 0
              ? "Your provided code is invalid"
              : "Your provided code is VALID!"}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default DiscountCodeValidator;
