import './discountCodeGenerator.css';
import { useEffect, useState } from 'react';
import { Form, Col, Row, Button } from "react-bootstrap";
import Connector from '../services/generateDiscountCodeConnection'
import { GenerateResponse } from "../models/generateResponse";
import { GenerateRequest } from '../models/generateRequest';

const DiscountCodeGenerator = () => {
  const { generateDiscountCode, events } = Connector();
  const [generateResponse, setGenerateResponse] = useState({} as GenerateResponse);

  const [count, setCount] = useState("");
  const [length, setLength] = useState(7);

  useEffect(() => {
    events((response) => setGenerateResponse(response));
  });

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    generateDiscountCode({ count: parseInt(count, 10), length: length } as GenerateRequest);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row class='px-5 my-3'>
        <Col sm={12}>
          <h3 className='title'>
            GENERATE DISCOUT CODES
          </h3>
        </Col>
        <Col sm={12}>
          <Form.Group>
            <div className='micro-text'>LENGTH OF THE CODE</div>
            <Button className='button' onClick={() => setLength(7)} style={length === 7 ? { backgroundColor: '#234987' } : {}}>7</Button>
            <Button className='button' onClick={() => setLength(8)} style={length === 8 ? { backgroundColor: '#234987' } : {}}>8</Button>
            <div className='micro-text'>NUMBER OF CODES TO GENERATE</div>
            <Form.Control className='input' type='number' placeholder='LENGHT' onChange={(e) => setCount(e.target.value)} />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <Button className='submit' variant='success' type='submit'>GENERATE</Button>
        </Col>
        <Col sm={12}>
          <div className='result'>{generateResponse.result === undefined ? "Codes were not generated" : (generateResponse.result ? "Codes generated SUCCESSFULLY" : "Issues generating codes")}</div>
        </Col>
      </Row>
    </Form>)
};

export default DiscountCodeGenerator;