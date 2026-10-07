import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./MyDependents.css";

function MyDependents() {
  const [step, setStep] = useState(1);
  const [searchText, setSearchText] = useState("");

  const firstNameRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    month: "",
    day: "",
    year: "",
    relation: "",
    gender: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array.from({ length: 30 }, (_, index) => index + 1);

  const years = Array.from(
    { length: 127 },
    (_, index) => 2026 - index
  );

  /* Focus on First Name when opening step 1 or 2 */
  useEffect(() => {
    if (step === 1 || step === 2) {
      setTimeout(() => {
        firstNameRef.current?.focus();
      }, 100);
    }
  }, [step]);

  /* Form input changes */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* Search */
  const handleSearch = () => {
    if (searchText.trim() === "") {
      alert("Please enter something to search.");
    } else {
      alert("Searching for: " + searchText);
    }
  };

  /* Logout */
  const handleLogout = () => {
    navigate("/login");
  };

  /* Next */
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  /* Back */
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  /* Send */
  const handleSend = () => {
    alert("Family Care Plan has been submitted!");
  };

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="content">

        {/* HEADER / TOPBAR */}
        <div className="topbar">

          <div className="top-actions">

            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
              Search
            </button>

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>


        {/* PAGE CONTENT */}
        <div className="dependents-page">

          {/* PAGE TITLE */}
          <div className="dependents-title">

            <h1>Build Your Profile</h1>

            <p>
              This information will let us know more about your Family.
            </p>

          </div>


          {/* PROGRESS */}
          <div className="dependents-progress">

            <div
              className={`progress-line ${
                step >= 2 ? "progress-active" : ""
              }`}
            ></div>

            <div
              className={`progress-line progress-line-right ${
                step >= 3 ? "progress-active" : ""
              }`}
            ></div>


            {/* STEP 1 */}
            <div className="progress-step">

              <div
                className={`progress-circle ${
                  step >= 1 ? "active" : ""
                }`}
              ></div>

              <span
                className={
                  step >= 1 ? "step-active-text" : ""
                }
              >
                Dependents Registration
              </span>

            </div>


            {/* STEP 2 */}
            <div className="progress-step">

              <div
                className={`progress-circle ${
                  step >= 2 ? "active" : ""
                }`}
              ></div>

              <span
                className={
                  step >= 2 ? "step-active-text" : ""
                }
              >
                Dependents Health Records
              </span>

            </div>


            {/* STEP 3 */}
            <div className="progress-step">

              <div
                className={`progress-circle ${
                  step >= 3 ? "active" : ""
                }`}
              ></div>

              <span
                className={
                  step >= 3 ? "step-active-text" : ""
                }
              >
                Family Care Plan
              </span>

            </div>

          </div>


          {/* ======================================
              STEP 1 & STEP 2
          ====================================== */}

          {(step === 1 || step === 2) && (

            <div className="dependent-card">

              <div className="dependent-card-header">

                <h2>
                  Let's start with the basic information
                </h2>

                <p>
                  Let us know with name and last name, contacting you at
                </p>

              </div>


              {/* NAME */}
              <div className="form-row">

                <div className="form-group">

                  <label>First Name</label>

                  <input
                    ref={firstNameRef}
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Eg. Michael"
                  />

                </div>


                <div className="form-group">

                  <label>Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Eg. Tomson"
                  />

                </div>

              </div>


              {/* BIRTH DATE */}
              <div className="form-group full-width">

                <label>Birth Date</label>

                <div className="birth-date-row">

                  {/* MONTH */}
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                  >

                    <option value="">
                      Month
                    </option>

                    {months.map((month) => (
                      <option
                        key={month}
                        value={month}
                      >
                        {month}
                      </option>
                    ))}

                  </select>


                  {/* DAY */}
                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                  >

                    <option value="">
                      Day
                    </option>

                    {days.map((day) => (
                      <option
                        key={day}
                        value={day}
                      >
                        {day}
                      </option>
                    ))}

                  </select>


                  {/* YEAR */}
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  >

                    <option value="">
                      Year
                    </option>

                    {years.map((year) => (
                      <option
                        key={year}
                        value={year}
                      >
                        {year}
                      </option>
                    ))}

                  </select>

                </div>

              </div>


              {/* RELATION & GENDER */}
              <div className="form-row">

                <div className="form-group">

                  <label>Relation</label>

                  <input
                    type="text"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    placeholder="Eg. Brother, Child"
                  />

                </div>


                <div className="form-group">

                  <label>I'm</label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                  </select>

                </div>

              </div>


              {/* BUTTONS */}
              <div className="dependent-buttons">

                {step > 1 && (

                  <button
                    type="button"
                    className="back-button"
                    onClick={handleBack}
                  >
                    BACK
                  </button>

                )}

                <button
                  type="button"
                  className="next-button"
                  onClick={handleNext}
                >
                  NEXT
                </button>

              </div>

            </div>

          )}


          {/* ======================================
              STEP 3 - FAMILY CARE PLAN
          ====================================== */}

          {step === 3 && (

            <div className="family-plan-card">

              <div className="plans-container">


                {/* STANDARD */}
                <div className="plan-box">

                  <h2>
                    Standard Plan
                  </h2>

                  <div className="plan-divider"></div>

                  <p>
                    <span>✓</span>
                    Detail One
                  </p>

                  <p>
                    <span>✓</span>
                    Detail Two
                  </p>

                  <p>
                    <span>✓</span>
                    Detail Three
                  </p>

                </div>


                {/* PREMIUM */}
                <div className="plan-box">

                  <h2>
                    Premium Plan
                  </h2>

                  <div className="plan-divider"></div>

                  <p>
                    <span>✓</span>
                    Detail One
                  </p>

                  <p>
                    <span>✓</span>
                    Detail Two
                  </p>

                  <p>
                    <span>✓</span>
                    Detail Three
                  </p>

                </div>


                {/* SUPER */}
                <div className="plan-box">

                  <h2>
                    Super Plan
                  </h2>

                  <div className="plan-divider"></div>

                  <p>
                    <span>✓</span>
                    Detail One
                  </p>

                  <p>
                    <span>✓</span>
                    Detail Two
                  </p>

                  <p>
                    <span>✓</span>
                    Detail Three
                  </p>

                </div>

              </div>


              {/* BUTTONS */}
              <div className="family-plan-buttons">

                <button
                  type="button"
                  className="back-button"
                  onClick={handleBack}
                >
                  BACK
                </button>

                <button
                  type="button"
                  className="send-button"
                  onClick={handleSend}
                >
                  SEND
                </button>

              </div>

            </div>

          )}

        </div>


        {/* FOOTER */}
        <Footer />

      </main>

    </div>
  );
}

export default MyDependents;