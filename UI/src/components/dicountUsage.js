import { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";


const DicountUsage = ({ useDiscountCode }) => {

  const [code, setCode] = useState();

  const onSubmit = (e) => {
    e.PreventDefault();
    useDiscountCode(code);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row className='px-5 py-5'>
        <Col sm='12'>
          <Form.Group>
            <Form.Control placeholder="Discount code" onChange={(e) => setCode(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
    </Form>)
};

export default DicountUsage;


