import './App.css';
import { Container, Col, Row } from "react-bootstrap";
import DiscountCodeValidator from './components/discountCodeValidator';
import DiscountCodeGenerator from './components/discountCodeGenerator';

function App() {

  return (
    <div className="app">
      <main>
        <Container>
          <Row>
            <Col>
              <h1 className='welcome font-weight-light'>
                WELCOME TO DISCOUNT CODES APP!
              </h1>
            </Col>
          </Row>
          <DiscountCodeGenerator />
          <DiscountCodeValidator />
          <br/>
          <br/>
          <br/>
          <Row>
            <Col className='author'>
              <p>Author: <a href="https://www.linkedin.com/in/valentinaskaminskas">Valentinas Kaminskas</a></p>
              <p><a href="mailto:valentk777@gmail.com">valentk777@gmail.com</a></p>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
