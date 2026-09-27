import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        MPH
      </div>

      <nav>
        <Link to="/dashboard">
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </Link>

        <Link to="/finddoctor">
          <i className="fa-solid fa-user-doctor"></i>
          <span>Find Doctor</span>
        </Link>

        <Link to="/findclinic">
          <i className="fa-solid fa-hospital"></i>
          <span>Find Clinic</span>
        </Link>

        <Link to="#">
          <i className="fa-solid fa-calendar"></i>
          <span>Appointments</span>
        </Link>

        <Link to="#">
          <i className="fa-solid fa-comments"></i>
          <span>Messages</span>
        </Link>

        <Link to="#">
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;