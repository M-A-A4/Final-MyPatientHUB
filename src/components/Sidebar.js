<<<<<<< HEAD
// import React from "react";
// import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";

// function Sidebar() {
//   return (
//     <aside className="sidebar">
//       <div className="logo">
//         MPH
//       </div>

//       <nav>
//         <Link to="/dashboard">
//           <i className="fa-solid fa-house"></i>
//           <span>Home</span>
//         </Link>

//         <Link to="/finddoctor">
//           <i className="fa-solid fa-user-doctor"></i>
//           <span>Find Doctor</span>
//         </Link>

//         <Link to="/findclinic">
//           <i className="fa-solid fa-hospital"></i>
//           <span>Find Clinic</span>
//         </Link>

    
//         <Link to="/marketplace">
//           <i className="fa-solid fa-store"></i>
//           <span>Find MarketPlace</span>
//         </Link>

//         <Link to="/findpharmacy">
//           <i className="fa-solid fa-pills"></i>
//           <span>Find Pharmacy</span>
//         </Link>

//         <Link to="/mydependents">
//           <i className="fa-solid fa-users"></i>
//           <span>My Dependents</span>
//         </Link>

//         <Link to="#">
//           <i className="fa-solid fa-calendar"></i>
//           <span>Appointments</span>
//         </Link>

        
//         <Link to="#">
//           <i className="fa-solid fa-comments"></i>
//           <span>Messages</span>
//         </Link>

//         <Link to="#">
//           <i className="fa-solid fa-gear"></i>
//           <span>Settings</span>
//         </Link>

//         <NavLink to="/myprofile" className="sidebar-link">
//   <span aria-hidden="true">👤</span>
//   <span>My Profile</span>
// </NavLink>

// <NavLink to="/settings" className="sidebar-link">
//   <span aria-hidden="true">⚙</span>
//   <span>Settings</span>
// </NavLink>

        
//       </nav>
//     </aside>
//   );
// }

// export default Sidebar;




import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css"
function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="logo">MPH</div>

      <nav>
        <NavLink to="/dashboard" className="sidebar-link">
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </NavLink>

        <NavLink to="/finddoctor" className="sidebar-link">
          <i className="fa-solid fa-user-doctor"></i>
          <span>Find Doctor</span>
        </NavLink>

        <NavLink to="/findclinic" className="sidebar-link">
          <i className="fa-solid fa-hospital"></i>
          <span>Find Clinic</span>
        </NavLink>

        <NavLink to="/marketplace" className="sidebar-link">
          <i className="fa-solid fa-store"></i>
          <span>Find Marketplace</span>
        </NavLink>

        <NavLink to="/findpharmacy" className="sidebar-link">
          <i className="fa-solid fa-pills"></i>
          <span>Find Pharmacy</span>
        </NavLink>

        <NavLink to="/mydependents" className="sidebar-link">
          <i className="fa-solid fa-users"></i>
          <span>My Dependents</span>
        </NavLink>

        <Link to="#" className="sidebar-link">
          <i className="fa-solid fa-calendar"></i>
          <span>Appointments</span>
        </Link>

        <Link to="#" className="sidebar-link">
          <i className="fa-solid fa-comments"></i>
          <span>Messages</span>
        </Link>

        <NavLink to="/myprofile" className="sidebar-link">
          <span aria-hidden="true">👤</span>
          <span>My Profile</span>
        </NavLink>

        <NavLink to="/settings" className="sidebar-link">
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </NavLink>
      </nav>
=======

import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "fa-house" },
    { label: "Appointments", path: "/appointments", icon: "fa-calendar-check" },
    { label: "Find Doctor", path: "/finddoctor", icon: "fa-user-doctor" },
    { label: "Find Clinic", path: "/findclinic", icon: "fa-hospital" },
    { label: "Chat", path: "/chat", icon: "fa-comments" },
    { label: "Find MarketPlace", path: "/marketplace", icon: "fa-store" },
    { label: "Find Pharmacy", path: "/findpharmacy", icon: "fa-prescription-bottle-medical" },
    { label: "My Dependents", path: "/mydependents", icon: "fa-users" },
    { label: "My Account", path: "/myaccount", icon: "fa-user" },
    { label: "Settings", path: "/settings", icon: "fa-gear" },
  ];

  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="sidebar-logo">
        <span className="sidebar-logo-mark">
          <i className="fa-solid fa-heart-pulse"></i>
        </span>
        <span className="sidebar-logo-text">
          <strong>MyPatientHUB</strong>
          <small>Healthcare platform</small>
        </span>
      </NavLink>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
            end={item.path === "/dashboard"}
          >
            <span className="sidebar-icon">
              <i className={`fa-solid ${item.icon}`}></i>
            </span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-help">
        <div className="sidebar-help-icon">
          <i className="fa-regular fa-circle-question"></i>
        </div>
        <strong>Need help?</strong>
        <p>We're here to help you manage your healthcare.</p>
        <button
          type="button"
          onClick={() =>
            window.alert("Please contact your MyPatientHUB support team.")
          }
        >
          Get Support
        </button>
      </div>

      <div className="sidebar-bottom">
        <i className="fa-solid fa-shield-heart"></i>
        <span>Your health, our priority</span>
      </div>
>>>>>>> c69c34df376818dbc6414d38ee907f22aec94d84
    </aside>
  );
}

export default Sidebar;
