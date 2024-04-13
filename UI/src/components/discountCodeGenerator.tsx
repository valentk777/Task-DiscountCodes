import './discountCodeGenerator.css';
import { useEffect, useState } from 'react';
import { Form, Col, Row, Button } from "react-bootstrap";
import Connector from '../services/generateDiscountCodeConnection'
import { GenerateResponse } from "../models/generateResponse";
import { GenerateRequest } from '../models/generateRequest';

const DiscountCodeGenerator = () => {
  const { generateDiscountCode, events } = Connector();
  const [generateResponse, setGenerateResponse] = useState({} as GenerateResponse);

  const [count, setCount] = useState(0);
  const [length, setLength] = useState("");

  useEffect(() => {
    events((response) => setGenerateResponse(response));
  });

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    generateDiscountCode({ count: count, length: parseInt(length, 10) } as GenerateRequest);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row class='px-5 my-3'>
        <Col sm={12}>
          <h3 className='title'>
            Generate discount code
          </h3>
        </Col>
        <Col sm={12}>
          <Form.Group>
            <div className='micro-text'>Select count</div>
            <Button className='button' onClick={() => setCount(7)} style={count === 7 ? {backgroundColor: '#234987'} : {}}>7</Button>
            <Button className='button' onClick={() => setCount(8)} style={count === 8 ? {backgroundColor: '#234987'} : {}}>8</Button>
            <div className='micro-text'>Select lenght</div>
            <Form.Control className='input' type='number' placeholder='Length' onChange={(e) => setLength(e.target.value)} />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <Button className='button' variant='success' type='submit'>Generate</Button>
        </Col>
        <Col sm={12}>
          <h1>{generateResponse.result === undefined ? "Codes was not generated" : (generateResponse.result ? "Codes generated SUCCESSFULLY" : "Issues generating codes")}</h1>
        </Col>
      </Row>
    </Form>)
};

export default DiscountCodeGenerator;