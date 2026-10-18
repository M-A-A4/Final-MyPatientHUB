
// import React from "react";
// import { Link } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import Header from "./Header";
// function FindDoctor() {
//   return (
//     <div className="dashboard-container">

//       <Sidebar />

//       <main className="content">
//       <Header/>
//         <section className="doctor-banner">
//           <h1>Find a Doctor</h1>
//           <p>Find the right doctor for your healthcare needs.</p>

//           <div className="banner-search">
//             <input
//               type="text"
//               placeholder="Search doctor or specialty"
//             />

//             <button>
//               <i className="fa-solid fa-magnifying-glass"></i>
//               Search
//             </button>
//           </div>
//         </section>

//         <div className="view-buttons">

//           <Link to="/doctorlist" className="view-btn">
//             <i className="fa-solid fa-list"></i>
//             List
//           </Link>

//           <Link to="/doctormap" className="view-btn">
//             <i className="fa-solid fa-map"></i>
//             Map
//           </Link>

//         </div>

//         <section className="service-section">

//           <h2>Find Doctor By Specialty</h2>

//           <div className="service-grid">

//             <div className="service-card specialty-card">
//               <i className="fa-solid fa-heart-pulse"></i>
//               <h3>Cardiology</h3>

//               <Link to="/doctormap" className="arrow-link">
//                 <i className="fa-solid fa-arrow-right"></i>
//               </Link>
//             </div>

//             <div className="service-card specialty-card">
//               <i className="fa-solid fa-brain"></i>
//               <h3>Neurology</h3>

//               <Link to="/doctormap" className="arrow-link">
//                 <i className="fa-solid fa-arrow-right"></i>
//               </Link>
//             </div>

//             <div className="service-card specialty-card">
//               <i className="fa-solid fa-tooth"></i>
//               <h3>Dentistry</h3>

//               <Link to="/doctormap" className="arrow-link">
//                 <i className="fa-solid fa-arrow-right"></i>
//               </Link>
//             </div>

//             <div className="service-card specialty-card">
//               <i className="fa-solid fa-eye"></i>
//               <h3>Ophthalmology</h3>

//               <Link to="/doctormap" className="arrow-link">
//                 <i className="fa-solid fa-arrow-right"></i>
//               </Link>
//             </div>

//           </div>

//         </section>

//         <Footer />

//       </main>

//     </div>
//   );
// }

// export default FindDoctor;





// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar"; import Header from "./Header"; import Footer from "./Footer"; import "./Discovery.css";
// const specialties = [{name:"Cardiology",icon:"fa-heart-pulse",count:"Heart & circulation"},{name:"Neurology",icon:"fa-brain",count:"Brain & nerves"},{name:"Dentistry",icon:"fa-tooth",count:"Oral health"},{name:"Ophthalmology",icon:"fa-eye",count:"Eye care"}];
// const doctors = [{id:1,name:"Dr. Mustafa Rahimi",specialty:"Cardiology",place:"Central Medical Centre",location:"Kabul, Afghanistan",rating:"4.9",fee:"$35",image:"/images/d1.jpg"},{id:2,name:"Dr. Khirullah Azimi",specialty:"Neurology",place:"City Specialist Clinic",location:"Kabul, Afghanistan",rating:"4.8",fee:"$30",image:"/images/d2.jpg"},{id:3,name:"Dr. Bilal Ahmad",specialty:"Dentistry",place:"Bright Smile Dental",location:"Kabul, Afghanistan",rating:"4.7",fee:"$20",image:"/images/d3.jpg"},{id:4,name:"Dr. Sara Noori",specialty:"Ophthalmology",place:"Vision Care Centre",location:"Kabul, Afghanistan",rating:"4.9",fee:"$25",image:"/images/azam.jpg"},{id:5,name:"Dr. Farid Habibi",specialty:"Cardiology",place:"Central Medical Centre",location:"Kabul, Afghanistan",rating:"4.6",fee:"$32",image:"/images/d2.jpg"}];
// function FindDoctor(){const location=useLocation(),navigate=useNavigate();const [query,setQuery]=useState(new URLSearchParams(location.search).get("q")||"");const [specialty,setSpecialty]=useState("");const [booking,setBooking]=useState(null);const [notice,setNotice]=useState("");useEffect(()=>setQuery(new URLSearchParams(location.search).get("q")||""),[location.search]);const filtered=doctors.filter(d=>(!specialty||d.specialty===specialty)&&`${d.name} ${d.specialty} ${d.place} ${d.location}`.toLowerCase().includes(query.toLowerCase()));const book=(doctor)=>setBooking(doctor);const submitBooking=e=>{e.preventDefault();const data=new FormData(e.currentTarget);const list=JSON.parse(localStorage.getItem("mypatienthub-bookings")||"[]");list.push({doctor:booking.name,date:data.get("date"),time:data.get("time"),createdAt:new Date().toISOString()});localStorage.setItem("mypatienthub-bookings",JSON.stringify(list));setNotice(`Appointment request saved for ${booking.name}.`);setBooking(null);};return <div className="dashboard-container"><Sidebar/><main className="content"><Header/><div className="discovery-page"><section className="discovery-hero"><span className="eyebrow"><i className="fa-solid fa-stethoscope"/> Care that starts with you</span><h1>Find the right doctor for you.</h1><p>Explore trusted specialists, compare care options, and request an appointment that fits your schedule.</p><form className="discovery-search" onSubmit={e=>{e.preventDefault();navigate(`/doctorlist?q=${encodeURIComponent(query)}`)}}><input aria-label="Search doctors" placeholder="Doctor name, specialty, or clinic" value={query} onChange={e=>setQuery(e.target.value)}/><button className="primary-action"><i className="fa-solid fa-magnifying-glass"/> Search doctors</button></form></section><div className="section-heading"><div><h2>Find doctors by specialty</h2><p>Choose a care area to narrow your results.</p></div><button className="secondary-action" onClick={()=>{setSpecialty("");setQuery("")}}>Reset filters</button></div><div className="specialty-grid">{specialties.map(s=><button key={s.name} className={`specialty-tile ${specialty===s.name?"selected":""}`} onClick={()=>setSpecialty(specialty===s.name?"":s.name)}><span className="specialty-icon"><i className={`fa-solid ${s.icon}`}/></span><span><strong>{s.name}</strong><small>{s.count}</small></span><i className="fa-solid fa-arrow-up-right-from-square tile-arrow"/></button>)}</div><div className="results-toolbar"><div><strong>Recommended doctors</strong><div><span>{filtered.length} specialists available</span></div></div><button className="secondary-action" onClick={()=>navigate(`/doctorlist${query?`?q=${encodeURIComponent(query)}`:""}`)}>View full directory <i className="fa-solid fa-arrow-right"/></button></div><div className="provider-grid">{filtered.slice(0,3).map(d=><DoctorCard key={d.id} doctor={d} onBook={book}/>)}{!filtered.length&&<div className="empty-results">No doctors match your search. Try a different name or specialty.</div>}</div>{notice&&<div className="booking-notice" role="status">{notice}<button onClick={()=>setNotice("")} aria-label="Dismiss">×</button></div>}</div><Footer/></main>{booking&&<BookingModal doctor={booking} onClose={()=>setBooking(null)} onSubmit={submitBooking}/>}</div>}
// export function DoctorCard({doctor,onBook}){return <article className="provider-card"><div className="provider-top"><img className="provider-avatar" src={`${process.env.PUBLIC_URL}${doctor.image}`} alt={doctor.name}/><div className="provider-name"><h3>{doctor.name}</h3><p>{doctor.specialty}</p></div><span className="rating-pill"><i className="fa-solid fa-star"/>{doctor.rating}</span></div><div className="provider-meta"><span><i className="fa-solid fa-hospital"/>{doctor.place}</span><span><i className="fa-solid fa-location-dot"/>{doctor.location}</span><span><i className="fa-regular fa-clock"/>Available this week</span></div><div className="provider-footer"><span className="provider-fee"><small>Consultation from</small>{doctor.fee}</span><button className="secondary-action" onClick={()=>onBook(doctor)}>Book appointment</button></div></article>}
// export function BookingModal({doctor,onClose,onSubmit}){return <div className="booking-modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><form className="booking-modal" onSubmit={onSubmit}><span className="eyebrow">Appointment request</span><h2>Book {doctor.name}</h2><p>Choose your preferred date and time. Your request will be saved in this demo application.</p><label>Preferred date<input name="date" type="date" min={new Date().toISOString().slice(0,10)} required/></label><label>Preferred time<select name="time" required defaultValue=""><option value="" disabled>Select a time</option><option>09:00 AM</option><option>10:30 AM</option><option>01:00 PM</option><option>03:30 PM</option></select></label><div className="modal-actions"><button type="button" className="cancel-action" onClick={onClose}>Cancel</button><button className="primary-action" type="submit">Confirm request</button></div></form></div>}
// export default FindDoctor;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
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
    image: "/images/azam.jpg",
  },
  {
    id: 5,
    name: "Dr. Farid Habibi",
    specialty: "Cardiology",
    place: "Central Medical Centre",
    location: "Kabul, Afghanistan",
    rating: "4.6",
    fee: "$32",
    image: "/images/d2.jpg",
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
    <div className="dashboard-container">
      <Sidebar />

      <main className="content">
      
 
        <div className="discovery-page">
          <Header />
          
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
        </div>

        <Footer />
      </main>

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