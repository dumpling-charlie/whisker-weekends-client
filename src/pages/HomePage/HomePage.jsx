import "./HomePage.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  return (
    <div className="home-page">
      <Carousel className="carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/husky1.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <Link to="/playdates/" className="link-text">
              <h3>Discover and create playdates near you</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/hamster.jpeg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <Link to="/friendly" className="link-text">
              <h3>Discover pet-friendly locations</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/shiba.jpeg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <Link to="/signup" className="link-text">
              <h3>
                Create an account today and find a play mate for your best mate
              </h3>
            </Link>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div
        className="banner container-fluid row text-center text-light"
        Style="padding: 5rem;"
      >
      
        <div className=" col-md-4 col-lg-4 ">
          <h2>Why?</h2>
          <p>
            Having a playdate for your pet can provide them with much-needed
            exercise, mental stimulation, and socialization. Moreover, it allows
            you to meet other pet owners, establish new connections, and build a
            supportive community around your mutual love for furry companions.
          </p>
        </div>
        <div className=" col-md-4 col-lg-4">
          <h2>Where?</h2>
          <p>
            Thanks to Whisker Weekend, you can easily find nearby pet-friendly
            locations and events where you can connect with other pet owners and
            their furry friends. Whether it's a playdate at the park or a social
            gathering at a local cafe, Whisker Weekend has got you covered.
          </p>
        </div>
        <div className="col-md-4 col-lg-4">
          <h2>When?</h2>
          <p>
            With Whisker Weekend, you can easily organize a playdate that fits
            your schedule and preferences, whether it's a one-on-one meetup or a
            group event. Alternatively, you can also browse existing playdates
            organized by other pet owners and join the ones that work for you
            and your furry friend.
          </p>
        </div>      
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
