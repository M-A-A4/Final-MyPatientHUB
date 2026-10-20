
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function FindClinicMap() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read the selected clinic name from the URL.
  const params = new URLSearchParams(location.search);
  const clinicName = params.get("q");

  // Display the selected clinic or all clinics in Kabul.
  const mapQuery = clinicName
    ? `${clinicName}, Kabul, Afghanistan`
    : "clinics in Kabul Afghanistan";

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&output=embed`;

  return (
    <div className="discovery-page">
      {/* Page Banner */}
      <section className="doctor-banner">
        <h1>Clinic Map</h1>
        <p>Explore clinic locations in Kabul, Afghanistan.</p>
      </section>

      {/* Navigation Buttons */}
      <div className="view-buttons">
        <Link to="/findclinic" className="view-btn">
          Overview
        </Link>

        <Link to="/findcliniclist" className="view-btn">
          <i className="fa-solid fa-list" /> List
        </Link>

        <Link
          to="/findclinicmap"
          className="view-btn active-btn"
        >
          <i className="fa-solid fa-map" /> Map
        </Link>
      </div>

      {/* Google Maps */}
      <section className="map-container">
        <h2>
          {clinicName ? `${clinicName} Location` : "Clinic locations"}
        </h2>

        <iframe
          title={
            clinicName
              ? `Map showing ${clinicName}`
              : "Clinic locations in Kabul"
          }
          src={mapUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Back to Clinic List */}
        <button
          className="view-btn"
          type="button"
          onClick={() => navigate("/findcliniclist")}
        >
          <i className="fa-solid fa-arrow-left" /> Back to clinic list
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FindClinicMap;

