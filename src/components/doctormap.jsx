
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function DoctorMap() {
  const navigate = useNavigate();

  return (
    <div className="discovery-page">
      {/* Page Banner */}
      <section className="doctor-banner">
        <h1>Doctor Map</h1>
        <p>
          Explore healthcare providers around Kabul, Afghanistan.
        </p>
      </section>

      {/* Navigation Buttons */}
      <div className="view-buttons">
        <button
          className="view-btn"
          onClick={() => navigate("/finddoctor")}
        >
          <i className="fa-solid fa-arrow-left" /> Back to Find Doctor
        </button>

        <Link to="/doctorlist" className="view-btn">
          <i className="fa-solid fa-list" /> List
        </Link>

        <Link to="/doctormap" className="view-btn active-btn">
          <i className="fa-solid fa-map" /> Map
        </Link>
      </div>

      {/* Google Maps */}
      <section className="map-container">
        <h2>Doctor locations</h2>

        <iframe
          title="Doctor locations in Kabul"
          src="https://www.google.com/maps?q=doctors+in+Kabul+Afghanistan&output=embed"
          loading="lazy"
          allowFullScreen
        />

        {/* Return to Doctor List */}
        <button
          className="view-btn"
          type="button"
          onClick={() => navigate("/doctorlist")}
        >
          <i className="fa-solid fa-list" /> Return to doctor list
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DoctorMap;
