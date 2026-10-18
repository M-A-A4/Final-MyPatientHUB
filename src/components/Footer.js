import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2026 MyPatientHUB
      </p>

      <div className="footer-links">
        <Link to="/dashboard">MyPatientHUB</Link>
        <Link to="/login">About Us</Link>
      </div>
    </footer>
  );
}

export default Footer;