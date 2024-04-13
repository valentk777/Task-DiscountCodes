import './discountCodeValidator.css';
import { useEffect, useState } from 'react';
import { Form, Col, Row, Button } from "react-bootstrap";
import Connector from '../services/validateDiscountCodeConnection'
import { UseCodeResponse } from '../models/useCodeResponse';
import { UseCodeRequest } from '../models/useCodeRequest';

const DiscountCodeValidator = () => {
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
    <Form onSubmit={onSubmit} className='discount'>
      <Row class='px-5 my-3'>
        <Col sm={12}>
          <h3 className='title'>
            Use discount code
          </h3>
        </Col>
        <Col sm={12}>
          <Form.Group>
          <div className='micro-text'>Enter discount code</div>
            <Form.Control className='input' placeholder='Discount code' onChange={(e) => setCode(e.target.value)} />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <Button  className='button' type='submit'>Validate</Button>
        </Col>
        <Col sm={12}>
          <h1>{validateCodeResponse.result === undefined ? "Not validated" : (validateCodeResponse.result === 0 ? "Your provided code is invalid" : "Your provided code is VALID!")}</h1>
        </Col>
      </Row>
    </Form>
  )
};

export default DiscountCodeValidator;