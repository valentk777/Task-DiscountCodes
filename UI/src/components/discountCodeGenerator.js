import { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

const DiscountCodeGenerator = ({ generateDiscountCodes }) => {

  const [count, setCount] = useState();
  const [length, setLength] = useState();

  const onSubmit = (e) => {
    e.PreventDefault();

    generateDiscountCodes(count);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row className='px-5 py-5'>
        <Col sm='12'>
          <Form.Group>
            <Form.Control type='number' placeholder='Count' onChange={(e) => setCount(e.target.value)} />
            <Form.Control type='number' placeholder='Length' onChange={(e) => setLength(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
    </Form>)
};

export default DiscountCodeGenerator;