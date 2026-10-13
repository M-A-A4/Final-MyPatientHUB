import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AccountPages.css"

const ACCOUNT_KEY = "mypatienthub-account";
const PROFILE_KEY = "mypatienthub-profile";

const emptyForm = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
};

function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const phone = formData.phone.trim();

    if (!fullName || !email || !password) {
      setMessage("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      return;
    }

    try {
      const existingAccount = localStorage.getItem(ACCOUNT_KEY);

      if (existingAccount) {
        const account = JSON.parse(existingAccount);

        if (account.email === email) {
          setMessage(
            "An account with this email already exists. Please sign in."
          );
          return;
        }

        setMessage(
          "This demo supports one account per browser. Please sign in with the existing account."
        );
        return;
      }

      const newAccount = {
        fullName,
        email,
        password,
      };

      const newProfile = {
        fullName,
        email,
        phone,
        dateOfBirth: "",
        gender: "",
        address: "",
        emergencyContact: "",
        bloodGroup: "",
      };

      // Save the demo account.
      localStorage.setItem(
        ACCOUNT_KEY,
        JSON.stringify(newAccount)
      );

      // Initialize the profile using registration information.
      localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(newProfile)
      );

      setMessage(
        "Registration successful! You can now sign in."
      );

      setFormData({
        ...emptyForm,
        email,
      });

      setIsSignUp(false);
    } catch {
      setMessage(
        "Unable to save your account. Please check your browser storage."
      );
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      const savedAccount = localStorage.getItem(ACCOUNT_KEY);

      if (!savedAccount) {
        setMessage("No account found. Please sign up first.");
        setIsSignUp(true);
        return;
      }

      const account = JSON.parse(savedAccount);

      if (
        account.email !== email ||
        account.password !== password
      ) {
        setMessage("Incorrect email or password.");
        return;
      }

      // Record that the user has signed in for this demo.
      localStorage.setItem("mypatienthub-authenticated", "true");

      navigate("/dashboard");
    } catch {
      setMessage(
        "Unable to sign in. Please try again."
      );
    }
  };

  const switchMode = () => {
    setIsSignUp((previousMode) => !previousMode);
    setFormData(emptyForm);
    setMessage("");
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
            <h2>{isSignUp ? "Create Your Account" : "Sign In"}</h2>

            <p>
              {isSignUp
                ? "Register to get started with MyPatientHUB."
                : "Welcome back! Sign in to continue."}
            </p>

            {message && (
              <div className="auth-message" role="status">
                {message}
              </div>
            )}

            <form
              onSubmit={isSignUp ? handleSignUp : handleSignIn}
            >
              {isSignUp && (
                <>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete={
                  isSignUp ? "new-password" : "current-password"
                }
                minLength={8}
                required
              />

              <button
                type="submit"
                className="btn-primary"
              >
                {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
              </button>
            </form>

            <div className="auth-switch">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button type="button" onClick={switchMode}>
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  New to MyPatientHUB?{" "}
                  <button type="button" onClick={switchMode}>
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </div>
          <div className="about-section">
        <h2>About MyPatientHUB</h2>

        <p>
          MyPatientHUB helps patients connect with clinics,
          pharmacies, doctors, and healthcare services.
        </p>

        <p>
          Our goal is to make healthcare easier, smarter,
          and more accessible through technology.
        </p>
      </div>
        </div>
      </section>

     

      <footer className="footer">
        <p>© 2026 MyPatientHUB</p>

        <div className="footer-links">
          <Link to="/dashboard">MyPatientHUB</Link>
          <Link to="/login">Sign In</Link>
        </div>
      </footer>
    </>
  );
}

export default Login;













// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (email === "") {
//       alert("Please enter your email");
//       return;
//     }

//     if (password === "") {
//       alert("Please enter your password");
//       return;
//     }

//     alert("Login Successful");
//     navigate("/dashboard");
//   };

//   return (
//     <>
//       <section className="hero">

//         <div className="overlay">

//           <h1>Welcome to MyPatientHUB</h1>

//           <p>
//             Connecting patients, clinics, pharmacies,
//             and healthcare services in one platform.
//           </p>

//           <div className="login-card">

//             <h2>Sign In</h2>

//             <div className="social-icons">

//               <button>
//                 <i className="fab fa-facebook-f"></i>
//               </button>

//               <button>
//                 <i className="fab fa-google"></i>
//               </button>

//             </div>

//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               className="btn-primary"
//               onClick={handleLogin}
//             >
//               SIGN IN
//             </button>

//             <div className="options">

//               <label>
//                 <input type="checkbox" />
//                 Remember Me
//               </label>

//               <a href="#forgot">
//                 Forgot Password?
//               </a>

//             </div>

//           </div>

//         </div>

//       </section>

//       <section className="about-section">

//         <h2>About MyPatientHUB</h2>

//         <p>
//           MyPatientHUB is a healthcare platform that helps
//           patients connect with clinics, pharmacies,
//           doctors, and healthcare services.
//         </p>

//         <p>
//           Our goal is to make healthcare easier,
//           smarter, and more accessible through
//           technology.
//         </p>

//       </section>

//       <footer className="footer">

//         <p>© 2026 MyPatientHUB</p>

//         <div className="footer-links">

//           <Link to="/dashboard">
//             MyPatientHUB
//           </Link>

//           <Link to="/login">
//             About Us
//           </Link>

//         </div>

//       </footer>
//     </>
//   );
// }

// export default Login;