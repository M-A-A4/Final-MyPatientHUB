
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function FindDoctor() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <main className="content">

        <section className="doctor-banner">
          <h1>Find a Doctor</h1>
          <p>Find the right doctor for your healthcare needs.</p>

          <div className="banner-search">
            <input
              type="text"
              placeholder="Search doctor or specialty"
            />

            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
              Search
            </button>
          </div>
        </section>

        <div className="view-buttons">

          <Link to="/doctorlist" className="view-btn">
            <i className="fa-solid fa-list"></i>
            List
          </Link>

          <Link to="/doctormap" className="view-btn">
            <i className="fa-solid fa-map"></i>
            Map
          </Link>

        </div>

        <section className="service-section">

          <h2>Find Doctor By Specialty</h2>

          <div className="service-grid">

            <div className="service-card specialty-card">
              <i className="fa-solid fa-heart-pulse"></i>
              <h3>Cardiology</h3>

              <Link to="/doctormap" className="arrow-link">
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="service-card specialty-card">
              <i className="fa-solid fa-brain"></i>
              <h3>Neurology</h3>

              <Link to="/doctormap" className="arrow-link">
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="service-card specialty-card">
              <i className="fa-solid fa-tooth"></i>
              <h3>Dentistry</h3>

              <Link to="/doctormap" className="arrow-link">
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="service-card specialty-card">
              <i className="fa-solid fa-eye"></i>
              <h3>Ophthalmology</h3>

              <Link to="/doctormap" className="arrow-link">
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

          </div>

        </section>

        <Footer />

      </main>

    </div>
  );
}

export default FindDoctor;

