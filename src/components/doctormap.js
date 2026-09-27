
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function DoctorMap() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <main className="content">

        <section className="doctor-banner">
          <h1>Doctor Map</h1>
          <p>Find doctors near you.</p>
        </section>

        <div className="view-buttons">

          <Link
            to="/doctorlist"
            className="view-btn"
          >
            <i className="fa-solid fa-list"></i>
            List
          </Link>

          <Link
            to="/doctormap"
            className="view-btn active-btn"
          >
            <i className="fa-solid fa-map"></i>
            Map
          </Link>

        </div>

        <section className="map-container">

          <h2>Doctor Locations</h2>

          <iframe
            title="Doctor Locations Map"
            src="https://www.google.com/maps?q=Kabul,Afghanistan&output=embed"
            loading="lazy"
          ></iframe>

        </section>

        <Footer />

      </main>

    </div>
  );
}

export default DoctorMap;

