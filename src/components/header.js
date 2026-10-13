
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiLogOut,
  FiHome,
} from "react-icons/fi";

import "./Header.css";

function Header({ onToggleSidebar, pageTitle = "My Account" }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchText.trim()) {
      console.log("Searching for:", searchText.trim());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mypatienthub-authenticated");
    navigate("/login");
  };

  return (
    <header className="patient-header">
      {/* Left section */}
      <div className="header-left">
        <button
          type="button"
          className="header-icon-button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          aria-expanded="true"
        >
          <FiMenu />
        </button>

        <nav className="header-breadcrumb" aria-label="Breadcrumb">
          <button
            type="button"
            className="header-home-button"
            onClick={() => navigate("/dashboard")}
            aria-label="Go to dashboard"
          >
            <FiHome />
          </button>

          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-current">{pageTitle}</span>
        </nav>
      </div>

      {/* Right section */}
      <div className="header-right">
        <form className="header-search" onSubmit={handleSearch}>
          <FiSearch />

          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        <button
          type="button"
          className="header-icon-button"
          aria-label="Notifications"
          onClick={() => console.log("Open notifications")}
        >
          <FiBell />
        </button>

        <button
          type="button"
          className="header-icon-button"
          aria-label="Settings"
          onClick={() => navigate("/settings")}
        >
          <FiSettings />
        </button>

        <button
          type="button"
          className="header-logout-button"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
