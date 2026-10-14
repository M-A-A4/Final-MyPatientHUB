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
    </aside>
  );
}

export default Sidebar;
