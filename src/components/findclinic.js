import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function FindClinic() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <main className="content">

        <section className="doctor-banner">

          <h1>Find a Clinic</h1>

          <p>
            Search Clinics and schedule an appointment.
          </p>

          <div className="banner-search">

            <input
              type="text"
              placeholder="Search"
            />

            <input
              type="text"
              placeholder="Zip Code or Neighborhood"
            />

            <button>
              SEARCH
            </button>

          </div>

        </section>

        <section className="clinic-layout">

          <div className="clinic-filters">

            <input
              type="text"
              placeholder="Primary Care"
            />

            <input
              type="text"
              placeholder="Zip Code or Neighborhood"
            />

            <h4>Filter By</h4>

            <select>
              <option>Specialty</option>
            </select>

            <select>
              <option>Gender</option>
            </select>

            <select>
              <option>Condition</option>
            </select>

            <select>
              <option>Languages</option>
            </select>

            <h4>Providers Who Treat</h4>

            <p>All Ages</p>
            <p>Children</p>
            <p>Adults</p>

          </div>

          <div className="clinic-content">

            <div className="view-buttons">

              <Link
                to="/findclinicmap"
                className="view-btn active-btn"
              >
                <i className="fa-solid fa-location-dot"></i>
                Map
              </Link>

              <Link
                to="/findcliniclist"
                className="view-btn"
              >
                <i className="fa-solid fa-list"></i>
                List
              </Link>

            </div>

            <iframe
              title="Clinic Map"
              src="https://www.google.com/maps?q=Kabul,Afghanistan&output=embed"
              loading="lazy"
            ></iframe>

          </div>

        </section>

        <Footer />

      </main>

    </div>
  );
}

export default FindClinic;