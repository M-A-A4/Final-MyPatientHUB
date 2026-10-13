
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");


const toggleSidebar = () => {
  const sidebar = document.querySelector(".sidebar");

  if (!sidebar) {
    console.error("Sidebar was not found.");
    return;
  }

  const layout = sidebar.closest(
    ".dashboard-container, .pharmacy-page, .marketplace-page"
  );

  if (!layout) {
    console.error("Page wrapper was not found.");
    return;
  }

  if (window.matchMedia("(max-width: 760px)").matches) {
    layout.classList.toggle("mobile-sidebar-open");
  } else {
    layout.classList.toggle("sidebar-collapsed");
  }
};




  const handleSearch = (event) => {
    event.preventDefault();

    if (!searchText.trim()) {
      alert("Please enter something to search.");
      return;
    }

    const text = searchText.trim().toLowerCase();

    const routes = [
      { words: ["home", "dashboard"], path: "/dashboard" },
      { words: ["doctor", "doctors"], path: "/finddoctor" },
      { words: ["clinic", "clinics"], path: "/findclinic" },
      { words: ["market", "marketplace"], path: "/marketplace" },
      { words: ["pharmacy", "pharmacies"], path: "/findpharmacy" },
      { words: ["dependent", "dependents"], path: "/mydependents" },
      { words: ["setting", "settings", "account"], path: "/settings" },
    ];

    const match = routes.find((route) =>
      route.words.some((word) => word.includes(text) || text.includes(word))
    );

    if (match) {
      navigate(match.path);
    } else {
      alert("No matching page found. Try Dashboard, Doctor, Clinic, or Settings.");
    }
  };

  return (
    <header className="app-topbar">
      <div className="app-breadcrumb">
        <div className="app-breadcrumb-line">
          <i className="fa-solid fa-house"></i>
          <span>/</span>
          <span>MyPatientHUB</span>
        </div>

        <strong>Healthcare Dashboard</strong>
      </div>

     
        <button
            type="button"
            className="app-menu-button"
            onClick={toggleSidebar}
            aria-label="Open or close sidebar"
          >
            <i className="fa-solid fa-bars"></i>
          </button>


      <div className="app-header-actions">
        <form className="app-search" onSubmit={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="search"
            placeholder="Type here..."
            aria-label="Search pages"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </form>

        <button
          type="button"
          className="app-logout-button"
          onClick={() => navigate("/login")}
        >
          <i className="fa-solid fa-circle-user"></i>
          <span>Log out</span>
        </button>

        <button
          type="button"
          className="app-header-icon"
          onClick={() => navigate("/settings")}
          aria-label="Settings"
          title="Settings"
        >
          <i className="fa-solid fa-gear"></i>
        </button>

        <button
          type="button"
          className="app-header-icon"
          onClick={() => alert("You have no new notifications.")}
          aria-label="Notifications"
          title="Notifications"
        >
          <i className="fa-solid fa-bell"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
