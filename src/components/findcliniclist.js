
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function FindClinicList() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <main className="content">

        <section className="doctor-banner">
          <h1>Clinic List</h1>
          <p>Find healthcare clinics and medical centers.</p>
        </section>

        <div className="view-buttons">

          <Link
            to="/findcliniclist"
            className="view-btn active-btn"
          >
            <i className="fa-solid fa-list"></i>
            List
          </Link>

          <Link
            to="/findclinicmap"
            className="view-btn"
          >
            <i className="fa-solid fa-map"></i>
            Map
          </Link>

        </div>

        <section className="service-section">

  <div className="clinic-layout">

    <div className="clinic-filters">

      <input
        type="text"
        placeholder="Primary Care"
      />

      <input
        type="text"
        placeholder="Zip code or Neighborhood"
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

      <h4>View Only</h4>

      <p>Online Scheduling</p>
      <p>Primary Care</p>

    </div>

    <div className="clinic-content">

      <div className="clinic-card">

      <img
        src={`${process.env.PUBLIC_URL}/images/area1.jpg`}
        alt="Clinic 1"
      />

        <div className="clinic-info">

          <h3>Afghan Health Clinic</h3>

          <p>AbdulHaq Square</p>

          <p>Kabul, Afghanistan</p>

          <p>+93 786504921</p>

        </div>

        <div className="clinic-buttons">

          <button>
            MORE ABOUT THIS LOCATION
          </button>

          <button>
            FIND A DOCTOR AND SCHEDULE
          </button>

        </div>

      </div>

      <div className="clinic-card">

       <img
        src={`${process.env.PUBLIC_URL}/images/area2.jpg`}
        alt="Clinic 2"
       />

        <div className="clinic-info">

          <h3>Salar Clinic</h3>

          <p>Karti4, Kabul</p>

          <p>Afghanistan</p>

          <p>+93 7656504921</p>

        </div>

        <div className="clinic-buttons">

          <button>
            MORE ABOUT THIS LOCATION
          </button>

          <button>
            FIND A DOCTOR AND SCHEDULE
          </button>

        </div>

      </div>

    </div>

  </div>

</section>

        <Footer />

      </main>

    </div>
  );
}

export default FindClinicList;

