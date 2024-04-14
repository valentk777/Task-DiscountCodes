import "./footer.css";

import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row>
        <Col className="author">
          <p>
            Author:{" "}
            <a href="https://www.linkedin.com/in/valentinaskaminskas">Valentinas Kaminskas</a>
          </p>
          <p>
            <a href="mailto:valentk777@gmail.com">valentk777@gmail.com</a>
          </p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
