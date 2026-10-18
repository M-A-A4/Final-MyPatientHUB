
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Header.css";

// function Header() {
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");

 



// const toggleSidebar = () => {
//   const sidebar = document.querySelector(".sidebar");

//   if (!sidebar) {
//     console.error("Sidebar was not found.");
//     return;
//   }

  
//  const layout = document.querySelector(
//   ".dashboard-container, .pharmacy-page, .marketplace-page, .account-layout"
// );


//   if (!layout) {
//     console.error("Page wrapper was not found.");
//     return;
//   }

//   if (window.matchMedia("(max-width: 760px)").matches) {
//     layout.classList.toggle("mobile-sidebar-open");
//   } else {
//     layout.classList.toggle("sidebar-collapsed");
//   }
// };




//   const handleSearch = (event) => {
//     event.preventDefault();

//     if (!searchText.trim()) {
//       alert("Please enter something to search.");
//       return;
//     }

//     const text = searchText.trim().toLowerCase();

//     const routes = [
//       { words: ["home", "dashboard"], path: "/dashboard" },
//       { words: ["doctor", "doctors"], path: "/finddoctor" },
//       { words: ["clinic", "clinics"], path: "/findclinic" },
//       { words: ["market", "marketplace"], path: "/marketplace" },
//       { words: ["pharmacy", "pharmacies"], path: "/findpharmacy" },
//       { words: ["dependent", "dependents"], path: "/mydependents" },
//       { words: ["my account", "myaccount", "profile"], path: "/myaccount" },
//       { words: ["setting", "settings", "account"], path: "/settings" },
//     ];

//     const match = routes.find((route) =>
//       route.words.some((word) => word.includes(text) || text.includes(word))
//     );

//     if (match) {
//       navigate(match.path);
//     } else {
//       alert("No matching page found. Try Dashboard, Doctor, Clinic, or Settings.");
//     }
//   };

//   return (
//     <header className="app-topbar">
//       <div className="app-breadcrumb">
//         <div className="app-breadcrumb-line">
//           <i className="fa-solid fa-house"></i>
//           <span>/</span>
//           <span>MyPatientHUB</span>
          
//         <button
//             type="button"
//             className="app-menu-button"
//             onClick={toggleSidebar}
//             aria-label="Open or close sidebar"
//           >
//             <i className="fa-solid fa-bars"></i>
//           </button>
//         </div>
// {/* 
//         <strong>Healthcare Dashboard</strong> */}

        
//       </div>

     


//       <div className="app-header-actions">
//         <form className="app-search" onSubmit={handleSearch}>
//           <i className="fa-solid fa-magnifying-glass"></i>

//           <input
//             type="search"
//             placeholder="Type here..."
//             aria-label="Search pages"
//             value={searchText}
//             onChange={(event) => setSearchText(event.target.value)}
//           />
//         </form>

//         <button
//           type="button"
//           className="app-logout-button"
//           onClick={() => navigate("/login")}
//         >
//           <i className="fa-solid fa-circle-user"></i>
//           <span>Log out</span>
//         </button>

//         <button
//           type="button"
//           className="app-header-icon"
//           onClick={() => navigate("/settings")}
//           aria-label="Settings"
//           title="Settings"
//         >
//           <i className="fa-solid fa-gear"></i>
//         </button>

//         <button
//           type="button"
//           className="app-header-icon"
//           onClick={() => alert("You have no new notifications.")}
//           aria-label="Notifications"
//           title="Notifications"
//         >
//           <i className="fa-solid fa-bell"></i>
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Header;


import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const searchIndex = [
  { label: "Find doctors", detail: "Doctors and specialties", path: "/finddoctor", terms: "doctor doctors cardiology neurology dentist dentistry eye ophthalmology physician mustafa rahimi khirullah azimi bilal ahmad sara noori farid habibi" },
  { label: "Find clinics", detail: "Clinics and medical centers", path: "/findcliniclist", terms: "clinic clinics hospital medical center primary care afghan health clinic central medical centre bright smile dental vision care centre abdulhaq shahr-e-naw" },
  { label: "Find pharmacy", detail: "Pharmacy locations and services", path: "/findpharmacy", terms: "pharmacy pharmacies carry medical pool medical ok pharmacy hamza pharma kabul city centre shahr-e-naw" },
  { label: "Marketplace", detail: "Health and wellness services", path: "/marketplace", terms: "market marketplace shop product food wellness service food panda grab food deliveroo minimalist" },
  { label: "Chat", detail: "Messages and care team conversations", path: "/chat", terms: "chat message messages inbox conversation" },
  { label: "My dependents", detail: "Manage family profiles", path: "/mydependents", terms: "dependent family child children profile" },
];
const pageTitles = {
  "/dashboard": "Dashboard", "/finddoctor": "Find Doctor", "/doctorlist": "Doctor Directory", "/doctormap": "Doctor Map",
  "/findclinic": "Find Clinic", "/findcliniclist": "Clinic Directory", "/findclinicmap": "Clinic Map", "/marketplace": "Health Marketplace",
  "/findpharmacy": "Find Pharmacy", "/mydependents": "My Dependents", "/myaccount": "My Account", "/settings": "Settings", "/chat": "Care Chat",
};
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState(() => new URLSearchParams(location.search).get("q") || "");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("mypatienthub-theme") === "dark");
  const [showAlerts, setShowAlerts] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const title = pageTitles[location.pathname] || "MyPatientHUB";
  useEffect(() => { document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light"); localStorage.setItem("mypatienthub-theme", darkMode ? "dark" : "light"); }, [darkMode]);
  useEffect(() => { setSearchText(new URLSearchParams(location.search).get("q") || ""); setShowSearchResults(false); }, [location.pathname, location.search]);
  const results = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return searchIndex.slice(0, 4);
    const matches = searchIndex.filter(item => `${item.label} ${item.detail} ${item.terms}`.toLowerCase().includes(q) || q.split(/\s+/).some(word => `${item.label} ${item.terms}`.toLowerCase().includes(word)));
    return matches.length ? matches : searchIndex.filter(item => ["doctor", "clinic", "pharmacy", "marketplace"].some(word => q.includes(word) && item.terms.includes(word)));
  }, [searchText]);
  const toggleSidebar = () => {
    const layout = document.querySelector(".dashboard-container, .pharmacy-page, .marketplace-page, .account-layout, .chat-layout");
    if (!layout) return;
    if (window.matchMedia("(max-width: 760px)").matches) layout.classList.toggle("mobile-sidebar-open");
    else layout.classList.toggle("sidebar-collapsed");
  };
  const isGenericCategory = (value) => /^(find\s+)?(doctors?|clinics?|pharmacies|pharmacy|marketplace|market|health marketplace|chat|messages?)$/i.test(value.trim());
  const submitSearch = (event) => {
    event.preventDefault();
    const q = searchText.trim();
    if (!q) { setShowSearchResults(true); return; }
    const lower = q.toLowerCase();
    let path = "/dashboard";
    if (/pharm|carry medical|pool medical|hamza pharma|ok pharmacy/.test(lower)) path = "/findpharmacy";
    else if (/market|shop|product|food|wellness|deliveroo|minimalist|grab food/.test(lower)) path = "/marketplace";
    else if (/clinic|hospital|medical center|medical centre|primary care|afghan health|bright smile|vision care|abdulhaq|shahr-e-naw/.test(lower)) path = "/findcliniclist";
    else if (/doctor|dr\.|mustafa|khirullah|cardio|neuro|dent|ophthal|physician|special|sara noori|farid habibi|bilal ahmad/.test(lower)) path = "/doctorlist";
    else if (/chat|message|conversation/.test(lower)) path = "/chat";
    else path = "/finddoctor";
    navigate(`${path}${isGenericCategory(q) ? "" : `?q=${encodeURIComponent(q)}`}`); setShowSearchResults(false);
  };
  return <header className="app-topbar glass-panel">
    <div className="topbar-brand-group">

      <div className="topbar-heading"><div className="app-breadcrumb-line"><i className="fa-solid fa-house"></i><span>/</span><span>MyPatientHUB</span><span>/</span>
     
            <button type="button" className="app-menu-button" onClick={toggleSidebar} aria-label="Toggle navigation">
            
            <i className="fa-solid fa-bars"></i>

              </button></div>
      <strong>{title}</strong></div>
    </div>
    <div className="app-header-actions">
      <form className="app-search" onSubmit={submitSearch} role="search"><i className="fa-solid fa-magnifying-glass"></i><input type="search" placeholder="Search doctors, clinics, pharmacy…" aria-label="Search healthcare services" value={searchText} onFocus={() => setShowSearchResults(true)} onChange={e => { setSearchText(e.target.value); setShowSearchResults(true); }} />{searchText && <button className="search-clear" type="button" onClick={() => { setSearchText(""); setShowSearchResults(false); }} aria-label="Clear search">×</button>}
        {showSearchResults && <div className="search-results-popover">{results.length ? results.map(item => <button type="button" key={item.path} onClick={() => { const q = searchText.trim(); navigate(`${item.path}${q && !isGenericCategory(q) ? `?q=${encodeURIComponent(q)}` : ""}`); setShowSearchResults(false); }}><span className="search-result-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></span><span><strong>{item.label}</strong><small>{item.detail}</small></span></button>) : <p className="search-empty">No matching section. Try doctor, clinic, pharmacy, or marketplace.</p>}</div>}
      </form>
      <button type="button" className="app-header-icon theme-toggle" onClick={() => setDarkMode(v => !v)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} title={darkMode ? "Light mode" : "Dark mode"}><i className={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i></button>
      <div className="alert-control"><button type="button" className="app-header-icon notification-button" onClick={() => setShowAlerts(v => !v)} aria-label="Notifications" aria-expanded={showAlerts} title="Notifications"><i className="fa-regular fa-bell"></i><span className="notification-dot"></span></button>{showAlerts && <div className="alerts-popover"><div className="popover-heading"><strong>Notifications</strong><span>Today</span></div><article><span className="alert-mark blue"><i className="fa-solid fa-calendar-check"></i></span><div><strong>Appointment reminder</strong><p>Your upcoming appointment details are ready to review.</p><small>10 minutes ago</small></div></article><article><span className="alert-mark green"><i className="fa-solid fa-heart-pulse"></i></span><div><strong>Health profile update</strong><p>Keep your contact and emergency details up to date.</p><small>Earlier today</small></div></article><button className="alerts-view-all" onClick={() => { setShowAlerts(false); navigate("/myaccount"); }}>Review my account <i className="fa-solid fa-arrow-right"></i></button></div>}</div>
      <button type="button" className="app-header-icon" onClick={() => navigate("/settings")} aria-label="Settings" title="Settings"><i className="fa-solid fa-sliders"></i></button>
      <button type="button" className="header-avatar" onClick={() => navigate("/myaccount")} aria-label="Open account">FF</button>
    </div>
    {showSearchResults && <button className="search-dismiss" aria-label="Close search suggestions" onClick={() => setShowSearchResults(false)} />}
  </header>;
}
export default Header;
