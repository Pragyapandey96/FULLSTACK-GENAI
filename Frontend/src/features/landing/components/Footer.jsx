import "../styles/landing.scss";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-top">

          <div className="footer-brand">
            <h2>HireReady AI</h2>
            <p>
              AI-powered interview preparation platform that helps
              students analyse resumes, practice interviews, and land
              their dream jobs.
            </p>
          </div>

          <div className="footer-links">
            <h3>Product</h3>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="/login">Login</a>
            <a href="/register">Get Started</a>
          </div>

          <div className="footer-links">
            <h3>Resources</h3>
            <a href="https://www.mongodb.com/resources/basics/full-stack-development" target="_blank">Documentation</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>

          <div className="footer-links">
            <h3>Connect</h3>

            <a
              href="https://github.com/Pragyapandey96"
              target="_blank"
              rel="noreferrer"
            >
             <FaGithub />
              Github
            </a>

            <a
              href="https://www.linkedin.com/in/pragya-pandey-954b0535a/"
              target="_blank"
              rel="noreferrer"
            >
             <FaLinkedin />
              LinkedIn
            </a>

            <a href="mailto:ppragya651@gmail.com">
              <FaEnvelope />
              Email
            </a>

          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} HireReady AI. All Rights Reserved.
          </p>

          <p>
            Built with ❤️ using React, Node.js, Express & Google Gemini
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;