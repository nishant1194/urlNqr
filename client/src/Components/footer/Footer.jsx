import React from "react";
import "./footer.css"; // Import CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        <h2>Made with ❤️</h2>
        <p>© {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
      </p>
      <div className="footer-links">
        <a
          href="https://github.com/nishant1194/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="mailto:nishantrpr1194@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gmail{" "}
        </a>
        <a
          href="https://www.linkedin.com/in/nishant-428476256/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
