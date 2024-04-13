import './dicountCodeValidator.css';
import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button } from "react-bootstrap";
import Connector from '../services/validateDiscountCodeConnection'
import { UseCodeResponse } from '../models/useCodeResponse';
import { UseCodeRequest } from '../models/useCodeRequest';

const DicountCodeValidator = () => {
  const { validateDiscountCode, events } = Connector();
  const [validateCodeResponse, setValidateCodeResponse] = useState({} as UseCodeResponse);

  const [code, setCode] = useState("");

  useEffect(() => {
    events(
      (response) => setValidateCodeResponse(response)
    );
  });

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    validateDiscountCode({ code: code } as UseCodeRequest);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row class='px-5 my-3'>
        <Col sm={12}>
          <h3 className='font-weight-light'>
            Use discount code
          </h3>
        </Col>
        <Col sm={12}>
          <Form.Group>
            <Form.Control placeholder='Discount code' onChange={(e) => setCode(e.target.value)} />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <hr />
          <Button variant='success' type='submit'>Generate</Button>
        </Col>
        <Col sm={12}>
          <hr />
          <h1>{validateCodeResponse.result}</h1>
        </Col>
      </Row>
    </Form>
  )
};

export default DicountCodeValidator;