
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function DoctorList() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <main className="content">

        <section className="doctor-banner">
          <h1>Doctor List</h1>
          <p>Find the right doctor for your healthcare needs.</p>
        </section>

        <div className="view-buttons">

          <Link
            to="/doctorlist"
            className="view-btn active-btn"
          >
            <i className="fa-solid fa-list"></i>
            List
          </Link>

          <Link
            to="/doctormap"
            className="view-btn"
          >
            <i className="fa-solid fa-map"></i>
            Map
          </Link>

        </div>

        <section className="service-section">

  <h2>Available Doctors</h2>

  <div className="doctor-list">

    <div className="doctor-card">

      <img
        src={process.env.PUBLIC_URL + "/images/d1.jpg"}
        alt="Doctor 1"
      />

      <div className="doctor-info">
        <h3>Doctor 1</h3>

        <p>
          <i className="fa-solid fa-heart-pulse"></i>
          Cardiology
        </p>

        <p>
          <i className="fa-solid fa-location-dot"></i>
          Medical Center
        </p>
      </div>

    </div>

    <div className="doctor-card">

      <img
        src={process.env.PUBLIC_URL + "/images/d2.jpg"}
        alt="Doctor 2"
      />

      <div className="doctor-info">
        <h3>Doctor 2</h3>

        <p>
          <i className="fa-solid fa-brain"></i>
          Neurology
        </p>

        <p>
          <i className="fa-solid fa-location-dot"></i>
          Medical Center
        </p>
      </div>

    </div>

    <div className="doctor-card">

      <img
        src={process.env.PUBLIC_URL + "/images/d3.jpg"}
        alt="Doctor 3"
      />

      <div className="doctor-info">
        <h3>Doctor 3</h3>

        <p>
          <i className="fa-solid fa-tooth"></i>
          Dentistry
        </p>

        <p>
          <i className="fa-solid fa-location-dot"></i>
          Medical Center
        </p>
      </div>

    </div>

  </div>

</section>

        <Footer />

      </main>

    </div>
  );
}

export default DoctorList;

