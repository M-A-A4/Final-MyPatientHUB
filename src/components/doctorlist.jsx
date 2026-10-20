
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const doctors = [
  {
    name: "Dr. Mustafa Rahimi",
    specialty: "Cardiology",
    place: "Central Medical Centre",
    img: "/images/d1.jpg",
  },
  {
    name: "Dr. Khirullah Azimi",
    specialty: "Neurology",
    place: "City Specialist Clinic",
    img: "/images/d2.jpg",
  },
  {
    name: "Dr. Bilal Ahmad",
    specialty: "Dentistry",
    place: "Bright Smile Dental",
    img: "/images/d3.jpg",
  },
];

function DoctorList() {
  const loc = useLocation();
  const navigate = useNavigate();

  const [q, setQ] = useState(
    new URLSearchParams(loc.search).get("q") || ""
  );

  const filtered = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty} ${doctor.place}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <div className="discovery-page">
      {/* Page Banner */}
      <section className="doctor-banner">
        <h1>Doctor List</h1>
        <p>Browse available doctors and specialties.</p>

        <div className="banner-search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or specialty"
          />

          <button onClick={() => setQ("")} type="button">
            Clear
          </button>
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="view-buttons">
        <button
          className="view-btn"
          onClick={() => navigate("/finddoctor")}
        >
          <i className="fa-solid fa-arrow-left" /> Back to Find Doctor
        </button>

        <Link to="/doctorlist" className="view-btn active-btn">
          <i className="fa-solid fa-list" /> List
        </Link>

        <Link to="/doctormap" className="view-btn">
          <i className="fa-solid fa-map" /> Map
        </Link>
      </div>

      {/* Doctor Results */}
      <section className="service-section">
        <h2>
          {filtered.length} doctor{filtered.length === 1 ? "" : "s"} found
        </h2>

        <div className="doctor-list">
          {filtered.map((doctor) => (
            <article className="doctor-card" key={doctor.name}>
              <img src={doctor.img} alt={doctor.name} />

              <div className="doctor-info">
                <h3>{doctor.name}</h3>

                <p>
                  <i className="fa-solid fa-stethoscope" />{" "}
                  {doctor.specialty}
                </p>

                <p>
                  <i className="fa-solid fa-location-dot" />{" "}
                  {doctor.place}, Kabul
                </p>
              </div>

              <button
                className="view-btn"
                type="button"
                onClick={() => navigate("/doctormap")}
              >
                View location
              </button>
            </article>
          ))}
        </div>

        {/* Empty Search Results */}
        {filtered.length === 0 && (
          <p>No doctors found. Try another search.</p>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DoctorList;
