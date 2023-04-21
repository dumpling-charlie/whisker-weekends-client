import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import './footer.css'

function Footer() {
  return (
    <footer className=" justify-content-center">
      <div className="content primary flex-row center">
        <ul className="d-flex justify-content-center align-items-center list-unstyled flex-row ">
          <li className="links d-flex align-items-center">
            <p>Mattie Barton</p>
            <a href="https://github.com/maitlandbarton" target="_blank">
              <AiFillGithub size="2rem" />
            </a>
          </li>
          <li className="links d-flex align-items-center">
            <a
              href="https://www.linkedin.com/in/mattiebarton/"
              target="_blank"
              className="footer-spacing-r"
            >
              <AiFillLinkedin size="2rem" />
            </a>
          </li>
          <li className="links d-flex align-items-center">
            <p className="footer-spacing-l">Sophie White</p>
            <a href="https://github.com/SElizaWhi" target="_blank">
              <AiFillGithub size="2rem" />
            </a>
          </li>
          <li className="links d-flex align-items-center">
            <a
              href="https://www.linkedin.com/in/sophie-e-white/"
              target="_blank"
            >
              <AiFillLinkedin size="2rem" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
