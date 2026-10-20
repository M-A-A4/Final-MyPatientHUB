// import React,{useState} from "react";import {Link,useNavigate} from "react-router-dom";import Footer from "./Footer";
// const doctors=[{"name": "Dr. Mustafa Rahimi", "specialty": "Cardiology", "place": "Central Medical Centre", "img": "/images/d1.jpg"}, {"name": "Dr. Khirullah Azimi", "specialty": "Neurology", "place": "City Specialist Clinic", "img": "/images/d2.jpg"}, {"name": "Dr. Bilal Ahmad", "specialty": "Dentistry", "place": "Bright Smile Dental", "img": "/images/d3.jpg"}];
// function FindDoctor(){const [q,setQ]=useState("");const navigate=useNavigate();const filtered=doctors.filter(d=>`${d.name} ${d.specialty} ${d.place}`.toLowerCase().includes(q.toLowerCase()));return <div className="discovery-page"><section className="doctor-banner"><h1>Find a Doctor</h1><p>Find the right doctor for your healthcare needs.</p><form className="banner-search" onSubmit={e=>{e.preventDefault();navigate(`/doctorlist?q=${encodeURIComponent(q)}`)}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Doctor name or specialty" aria-label="Doctor name or specialty"/><button type="submit"><i className="fa-solid fa-magnifying-glass"/> Search</button></form></section><div className="view-buttons"><Link to="/doctorlist" className="view-btn"><i className="fa-solid fa-list"/> Doctor list</Link><Link to="/doctormap" className="view-btn"><i className="fa-solid fa-map"/> Doctor map</Link></div><section className="service-section"><h2>Find a doctor by specialty</h2><div className="service-grid">{["Cardiology","Neurology","Dentistry","Ophthalmology"].map((s,i)=><button className="service-card specialty-card" key={s} type="button" onClick={()=>navigate(`/doctorlist?q=${encodeURIComponent(s)}`)}><i className={`fa-solid ${["fa-heart-pulse","fa-brain","fa-tooth","fa-eye"][i]}`}/><h3>{s}</h3><span>Browse doctors →</span></button>)}</div><h2>Featured doctors</h2><div className="doctor-list">{filtered.map(d=><article className="doctor-card" key={d.name}><img src={d.img} alt={d.name}/><div className="doctor-info"><h3>{d.name}</h3><p>{d.specialty}</p><p>{d.place}</p></div><button className="view-btn" onClick={()=>navigate(`/doctorlist?q=${encodeURIComponent(d.name)}`)}>View</button></article>)}</div>{!filtered.length&&<p>No doctors found. Try another search.</p>}</section><Footer/></div>}export default FindDoctor;





import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import Footer from "./Footer";

import "./Discovery.css";

// 1. Doctor specialties
const specialties = [
  {
    name: "Cardiology",
    icon: "fa-heart-pulse",
    count: "Heart & circulation",
  },
  {
    name: "Neurology",
    icon: "fa-brain",
    count: "Brain & nerves",
  },
  {
    name: "Dentistry",
    icon: "fa-tooth",
    count: "Oral health",
  },
  {
    name: "Ophthalmology",
    icon: "fa-eye",
    count: "Eye care",
  },
];

// 2. Sample doctor information
const doctors = [
  {
    id: 1,
    name: "Dr. Mustafa Rahimi",
    specialty: "Cardiology",
    place: "Central Medical Centre",
    location: "Kabul, Afghanistan",
    rating: "4.9",
    fee: "$35",
    image: "/images/d1.jpg",
  },
  {
    id: 2,
    name: "Dr. Khirullah Azimi",
    specialty: "Neurology",
    place: "City Specialist Clinic",
    location: "Kabul, Afghanistan",
    rating: "4.8",
    fee: "$30",
    image: "/images/d2.jpg",
  },
  {
    id: 3,
    name: "Dr. Bilal Ahmad",
    specialty: "Dentistry",
    place: "Bright Smile Dental",
    location: "Kabul, Afghanistan",
    rating: "4.7",
    fee: "$20",
    image: "/images/d3.jpg",
  },
  {
    id: 4,
    name: "Dr. Sara Noori",
    specialty: "Ophthalmology",
    place: "Vision Care Centre",
    location: "Kabul, Afghanistan",
    rating: "4.9",
    fee: "$25",
    image: "/images/d2.jpg",
  },
  {
    id: 5,
    name: "Dr. Farid Habibi",
    specialty: "Cardiology",
    place: "Central Medical Centre",
    location: "Kabul, Afghanistan",
    rating: "4.6",
    fee: "$32",
    image: "/images/d3.jpg",
  },
];

// 3. Main Find Doctor page
function FindDoctor() {
  const location = useLocation();
  const navigate = useNavigate();

  // Store the search text, selected specialty, and booking information
  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get("q") || ""
  );

  const [specialty, setSpecialty] = useState("");
  const [booking, setBooking] = useState(null);
  const [notice, setNotice] = useState("");

  // Update the search when the URL query changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setQuery(searchParams.get("q") || "");
  }, [location.search]);

  // 4. Filter doctors by specialty and search text
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty =
      !specialty || doctor.specialty === specialty;

    const doctorInformation = `
      ${doctor.name}
      ${doctor.specialty}
      ${doctor.place}
      ${doctor.location}
    `.toLowerCase();

    const matchesSearch = doctorInformation.includes(
      query.toLowerCase().trim()
    );

    return matchesSpecialty && matchesSearch;
  });

  // 5. Open the booking modal
  function handleBook(doctor) {
    setBooking(doctor);
  }

  // 6. Save the appointment request
  function handleBookingSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const appointment = {
      doctor: booking.name,
      date: formData.get("date"),
      time: formData.get("time"),
      createdAt: new Date().toISOString(),
    };

    // Read existing appointment requests
    let savedBookings = [];

    try {
      const storedBookings = localStorage.getItem(
        "mypatienthub-bookings"
      );

      savedBookings = storedBookings
        ? JSON.parse(storedBookings)
        : [];

      if (!Array.isArray(savedBookings)) {
        savedBookings = [];
      }
    } catch {
      savedBookings = [];
    }

    // Add the new appointment
    savedBookings.push(appointment);

    localStorage.setItem(
      "mypatienthub-bookings",
      JSON.stringify(savedBookings)
    );

    // Show confirmation
    setNotice(`Appointment request saved for ${booking.name}.`);

    // Close the modal
    setBooking(null);
  }

  // 7. Reset the filters
  function handleResetFilters() {
    setSpecialty("");
    setQuery("");
  }

  // 8. Navigate to the full doctor directory
  function handleViewDirectory() {
    const search = query.trim()
      ? `?q=${encodeURIComponent(query.trim())}`
      : "";

    navigate(`/doctorlist${search}`);
  }

  
  return (
  <div className="discovery-page">
          
          {/* Hero section and search */}
          <section className="discovery-hero">
             
            <span className="eyebrow">
              <i className="fa-solid fa-stethoscope"></i>
              Care that starts with you
            </span>

            <h1>Find the right doctor for you.</h1>

            {/* <p>
              Explore trusted specialists, compare care options, and
              request an appointment that fits your schedule.
            </p> */}

            <form
              className="discovery-search"
              onSubmit={(event) => {
                event.preventDefault();

                const search = query.trim()
                  ? `?q=${encodeURIComponent(query.trim())}`
                  : "";

                navigate(`/doctorlist${search}`);
              }}
            >
              <input
                type="text"
                aria-label="Search doctors"
                placeholder="Doctor name, specialty, or clinic"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />

              <button className="primary-action" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
                Search doctors
              </button>
            </form>
          </section>

          {/* Specialty filters */}
          <div className="section-heading">
            <div>
              <h2>Find doctors by specialty</h2>
              <p>Choose a care area to narrow your results.</p>
            </div>

            <button
              className="secondary-action"
              type="button"
              onClick={handleResetFilters}
            >
              Reset filters
            </button>
          </div>

          <div className="specialty-grid">
            {specialties.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`specialty-tile ${
                  specialty === item.name ? "selected" : ""
                }`}
                onClick={() => {
                  setSpecialty(
                    specialty === item.name ? "" : item.name
                  );
                }}
              >
                <span className="specialty-icon">
                  <i className={`fa-solid ${item.icon}`}></i>
                </span>

                <span>
                  <strong>{item.name}</strong>
                  <small>{item.count}</small>
                </span>

                <i className="fa-solid fa-arrow-up-right-from-square tile-arrow"></i>
              </button>
            ))}
          </div>

          {/* Search results heading */}
          <div className="results-toolbar">
            <div>
              <strong>Recommended doctors</strong>

              <div>
                <span>
                  {filteredDoctors.length} specialists available
                </span>
              </div>
            </div>

            <button
              className="secondary-action"
              type="button"
              onClick={handleViewDirectory}
            >
              View full directory
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          {/* Doctor cards */}
          <div className="provider-grid">
            {filteredDoctors.slice(0, 3).map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={handleBook}
              />
            ))}

            {filteredDoctors.length === 0 && (
              <div className="empty-results">
                No doctors match your search. Try a different name or
                specialty.
              </div>
            )}
          </div>

          {/* Booking confirmation message */}
          {notice && (
            <div className="booking-notice" role="status">
              {notice}

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          )}
      <Footer />
  
      {/* Show the modal only when a doctor has been selected */}
      {booking && (
        <BookingModal
          doctor={booking}
          onClose={() => setBooking(null)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
}

// 9. Reusable doctor card
export function DoctorCard({ doctor, onBook }) {
  return (
    <article className="provider-card">
      <div className="provider-top">
        <img
          className="provider-avatar"
          src={`${process.env.PUBLIC_URL}${doctor.image}`}
          alt={doctor.name}
        />

        <div className="provider-name">
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>
        </div>

        <span className="rating-pill">
          <i className="fa-solid fa-star"></i>
          {doctor.rating}
        </span>
      </div>

      <div className="provider-meta">
        <span>
          <i className="fa-solid fa-hospital"></i>
          {doctor.place}
        </span>

        <span>
          <i className="fa-solid fa-location-dot"></i>
          {doctor.location}
        </span>

        <span>
          <i className="fa-regular fa-clock"></i>
          Available this week
        </span>
      </div>

      <div className="provider-footer">
        <span className="provider-fee">
          <small>Consultation from</small>
          {doctor.fee}
        </span>

        <button
          className="secondary-action"
          type="button"
          onClick={() => onBook(doctor)}
        >
          Book appointment
        </button>
      </div>
    </article>
  );
}

// 10. Appointment booking modal
export function BookingModal({ doctor, onClose, onSubmit }) {
  return (
    <div
      className="booking-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <form className="booking-modal" onSubmit={onSubmit}>
        <span className="eyebrow">Appointment request</span>

        <h2>Book {doctor.name}</h2>

        <p>
          Choose your preferred date and time. Your request will be
          saved in this demo application.
        </p>

        <label>
          Preferred date

          <input
            name="date"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            required
          />
        </label>

        <label>
          Preferred time

          <select name="time" defaultValue="" required>
            <option value="" disabled>
              Select a time
            </option>

            <option>09:00 AM</option>
            <option>10:30 AM</option>
            <option>01:00 PM</option>
            <option>03:30 PM</option>
          </select>
        </label>

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-action"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="primary-action" type="submit">
            Confirm request
          </button>
        </div>
      </form>
    </div>
  );
}

export default FindDoctor;