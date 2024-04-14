import DiscountCodeGenerator from "components/discountCodeGenerator/discountCodeGenerator";
import DiscountCodeValidator from "components/discountCodeValidator/discountCodeValidator";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="home-container">
      <DiscountCodeGenerator />
      <DiscountCodeValidator />
    </Container>
  );
};

export default Home;
