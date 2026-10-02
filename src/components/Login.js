import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "") {
      alert("Please enter your email");
      return;
    }

    if (password === "") {
      alert("Please enter your password");
      return;
    }

    alert("Login Successful");
    navigate("/dashboard");
  };

  return (
    <>
      <section className="hero">

        <div className="overlay">

          <h1>Welcome to MyPatientHUB</h1>

          <p>
            Connecting patients, clinics, pharmacies,
            and healthcare services in one platform.
          </p>

          <div className="login-card">

            <h2>Sign In</h2>

            <div className="social-icons">

              <button>
                <i className="fab fa-facebook-f"></i>
              </button>

              <button>
                <i className="fab fa-google"></i>
              </button>

            </div>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn-primary"
              onClick={handleLogin}
            >
              SIGN IN
            </button>

            <div className="options">

              <label>
                <input type="checkbox" />
                Remember Me
              </label>

              <a href="#forgot">
                Forgot Password?
              </a>

            </div>

          </div>

        </div>

      </section>

      <section className="about-section">

        <h2>About MyPatientHUB</h2>

        <p>
          MyPatientHUB is a healthcare platform that helps
          patients connect with clinics, pharmacies,
          doctors, and healthcare services.
        </p>

        <p>
          Our goal is to make healthcare easier,
          smarter, and more accessible through
          technology.
        </p>

      </section>

      <footer className="footer">

        <p>© 2026 MyPatientHUB</p>

        <div className="footer-links">

          <Link to="/dashboard">
            MyPatientHUB
          </Link>

          <Link to="/login">
            About Us
          </Link>

        </div>

      </footer>
    </>
  );
}

export default Login;