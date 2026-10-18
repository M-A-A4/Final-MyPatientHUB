
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ onNavigate }) {
  const location = useLocation();
  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "fa-house" },
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
              `sidebar-link ${isActive || (item.path === "/findclinic" && location.pathname.startsWith("/findclinic")) ? "active" : ""}`
            }
            end={item.path === "/dashboard"} onClick={onNavigate}
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
    </aside>
  );
}

export default Sidebar;
