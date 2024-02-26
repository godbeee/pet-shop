import Hero from "../../components/Hero/Hero";
import Category from "../../components/Category/Category";
import OutstandingPets from "../../components/OutstandingPets/OutstandingPets";
import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <>
      <Container>
        <Hero />
        <Category />
        <OutstandingPets />
      </Container>
    </>
  );
}

export default HomePage;
