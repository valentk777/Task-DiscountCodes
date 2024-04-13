import './discountCodeGenerator.css';
import { useEffect, useState } from 'react';
import { Form, Col, Row, Button } from "react-bootstrap";
import Connector from '../services/generateDiscountCodeConnection'
import { GenerateResponse } from "../models/generateResponse";
import { GenerateRequest } from '../models/generateRequest';

const DiscountCodeGenerator = () => {
  const { generateDiscountCode, events } = Connector();
  const [generateResponse, setGenerateResponse] = useState({result: false} as GenerateResponse);

  const [count, setCount] = useState("");
  const [length, setLength] = useState("");

  useEffect(() => {
    events((response) => setGenerateResponse(response));
  });

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    generateDiscountCode({ count: parseInt(count, 10), length: parseInt(length, 10) } as GenerateRequest);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row class='px-5 my-3'>
        <Col sm={12}>
          <h3 className='font-weight-light'>
            Generate discount code
          </h3>
        </Col>
        <Col sm={12}>
          <Form.Group>
            <Form.Control type='number' placeholder='Count' onChange={(e) => setCount(e.target.value)} />
            <Form.Control type='number' placeholder='Length' onChange={(e) => setLength(e.target.value)} />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <hr />
          <Button variant='success' type='submit'>Generate</Button>
        </Col>
        <Col sm={12}>
          <hr />
          <h1>{generateResponse.result.toString()}</h1>
        </Col>
      </Row>
    </Form>)
};

export default DiscountCodeGenerator;