import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import './footer.css'

function Footer() {
  return (
    <footer className=" justify-content-center font-link">
      <div className="content primary flex-row center">
        <ul className="d-flex justify-content-center align-items-center list-unstyled flex-row">
          <li className="links">
            <p>Mattie Barton</p>
            <a
              href="https://github.com/maitlandbarton"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="icon">
                <AiFillGithub size="2rem" />
              </h3>
            </a>
          </li>
          <li className="links">
            <a
              href="https://www.linkedin.com/in/mattiebarton/"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="icon">
                <AiFillLinkedin size="2rem" />
              </h3>
            </a>
          </li>
          <li className="links">
            <p>Sophie White</p>
            <a
              href="https://github.com/SElizaWhi"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="icon">
                <AiFillGithub size="2rem" />
              </h3>
            </a>
          </li>
          <li className="links">
            <a
              href="https://www.linkedin.com/in/sophie-e-white/"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="icon">
                <AiFillLinkedin size="2rem" />
              </h3>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
