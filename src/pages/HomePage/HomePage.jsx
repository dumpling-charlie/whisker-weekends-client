import "./HomePage.css";
import Carousel from "react-bootstrap/Carousel";

function HomePage() {
  return (
    <Carousel className="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/husky1.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Find the perfect play-mate for your best-mate</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/hamster.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Discover pet-friendly locations</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/shiba.jpeg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Keep up to date on upcoming playdates</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomePage;
