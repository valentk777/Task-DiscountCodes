import './App.css';
import { Container, Col, Row } from "react-bootstrap";
import DicountCodeValidator from './components/dicountCodeValidator';
import DiscountCodeGenerator from './components/discountCodeGenerator';

function App() {

  return (
    <div className="App">
      <main>
        <Container>
          <Row>
            <Col>
              <h1 className='font-weight-light'>
                Welcome to discount code app
              </h1>
            </Col>
          </Row>
          <DiscountCodeGenerator />
          <br />
          <DicountCodeValidator />
        </Container>
      </main>
    </div>
  );
}

export default App;
