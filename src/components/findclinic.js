import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Discovery.css";

const clinics = [
 {id:1,name:"Afghan Health Clinic",area:"AbdulHaq Square",city:"Kabul, Afghanistan",phone:"+93 786 504 921",specialty:"Primary Care",image:"/images/area1.jpg",ages:["All Ages","Children","Adults"],online:true},
 {id:2,name:"Salar Clinic",area:"Karti 4",city:"Kabul, Afghanistan",phone:"+93 765 650 4921",specialty:"General Medicine",image:"/images/area2.jpg",ages:["All Ages","Adults"],online:false}
];

function FindClinic() {
 const [query,setQuery]=useState(""); const [area,setArea]=useState(""); const navigate=useNavigate();
 const results=useMemo(()=>clinics.filter(c=>`${c.name} ${c.area} ${c.city} ${c.specialty}`.toLowerCase().includes(`${query} ${area}`.trim().toLowerCase())),[query,area]);
 return <div className="discovery-page">
  <section className="doctor-banner"><h1>Find a Clinic</h1><p>Search clinics and schedule an appointment.</p>
   <form className="banner-search" onSubmit={e=>{e.preventDefault();navigate(`/findcliniclist?q=${encodeURIComponent(query)}&area=${encodeURIComponent(area)}`);}}>
    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Clinic name or specialty" aria-label="Clinic name or specialty"/>
    <input value={area} onChange={e=>setArea(e.target.value)} placeholder="City or neighborhood" aria-label="City or neighborhood"/>
    <button type="submit"><i className="fa-solid fa-magnifying-glass"/> Search</button>
   </form>
  </section>
  <section className="clinic-layout">
   <aside className="clinic-filters"><h3>Filter clinics</h3><label>Clinic or specialty<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. primary care"/></label><label>Location<input value={area} onChange={e=>setArea(e.target.value)} placeholder="Neighborhood"/></label><h4>Specialty</h4><select onChange={e=>setQuery(e.target.value)} value={query}><option value="">All specialties</option><option>Primary Care</option><option>General Medicine</option></select><button className="view-btn" type="button" onClick={()=>{setQuery("");setArea("");}}>Clear filters</button></aside>
   <div className="clinic-content"><div className="view-buttons"><Link to="/findclinic" className="view-btn active-btn">Overview</Link><Link to="/findcliniclist" className="view-btn"><i className="fa-solid fa-list"/> List ({results.length})</Link><Link to="/findclinicmap" className="view-btn"><i className="fa-solid fa-map"/> Map</Link></div>
    <div className="service-section"><h2>Clinics near you</h2>{results.length ? results.map(c=><article className="clinic-card" key={c.id}><img src={c.image} alt={c.name}/><div className="clinic-info"><h3>{c.name}</h3><p><i className="fa-solid fa-location-dot"/> {c.area}, {c.city}</p><p><i className="fa-solid fa-stethoscope"/> {c.specialty}</p><p><i className="fa-solid fa-phone"/> {c.phone}</p></div><div className="clinic-buttons"><button type="button" onClick={()=>navigate(`/findcliniclist?q=${encodeURIComponent(c.name)}`)}>More details</button><button type="button" onClick={()=>navigate("/finddoctor")}>Find a doctor</button></div></article>):<p>No clinics match these filters. Try another name or location.</p>}</div>
   </div>
  </section><Footer/>
 </div>;
}
export default FindClinic;
