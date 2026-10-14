// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import "./project18.css";
// import { useState } from "react";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import FindDoctor from "./components/finddoctor";
// import DoctorList from "./components/doctorlist";
// import DoctorMap from "./components/doctormap";
// import FindClinic from "./components/findclinic";
// import FindClinicList from "./components/findcliniclist";
// import FindClinicMap from "./components/findclinicmap";
// import Marketplace from "./components/Marketplace";
// import FindPharmacy from "./components/FindPharmacy";
// import MyDependents from "./components/MyDependents";
// import MyProfile from "./components/myprofile";
// import Settings from "./components/setting";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/header";
// function RedirectHandler() {
//   const location = useLocation();

//   React.useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const redirect = params.get("redirect");

//     if (redirect) {
//       window.history.replaceState(
//         {},
//         "",
//         "/Final-MyPatientHUB" + redirect
//       );
//       window.location.reload();
//     }
//   }, [location]);

//   return null;
// }




// function App() {
//       const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
//   const onToggleSidebar = () => {
//     setSidebarCollapsed((previous) => !previous);
//   };
//   return (
//     <>
//       <Sidebar collapsed={sidebarCollapsed} />
//      <main>
//       <Header onToggleSidebar={onToggleSidebar} pageTitle="My Profile" />
    
//     <BrowserRouter>
//       <RedirectHandler />

//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />

//         <Route path="/login" element={<Login />} />

//         <Route path="/dashboard" element={<Dashboard />} />

//         <Route path="/finddoctor" element={<FindDoctor />} />

//         <Route path="/doctorlist" element={<DoctorList />} />

//         <Route path="/doctormap" element={<DoctorMap />} />

//         <Route path="/findclinic" element={<FindClinic />} />

//         <Route path="/findcliniclist" element={<FindClinicList />} />

//         <Route path="/findclinicmap" element={<FindClinicMap />} />

//         <Route path="/marketplace" element={<Marketplace />} />

//         <Route path="/findpharmacy" element={<FindPharmacy />} />

//         <Route path="/mydependents" element={<MyDependents />} />

//         <Route path="/myprofile" element={<MyProfile />} />
//         <Route path="/settings" element={<Settings />} />

//         </Routes>
        
//     </BrowserRouter>
//      </main>
//     </>
//   );
// }

// export default App;



import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./project18.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import FindDoctor from "./components/finddoctor";
import DoctorList from "./components/doctorlist";
import DoctorMap from "./components/doctormap";
import FindClinic from "./components/findclinic";
import FindClinicList from "./components/findcliniclist";
import FindClinicMap from "./components/findclinicmap";
import Marketplace from "./components/Marketplace";
import FindPharmacy from "./components/FindPharmacy";
import MyDependents from "./components/MyDependents";
import MyProfile from "./components/myprofile";
import Settings from "./components/setting";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";

function RedirectHandler() {
  const location = useLocation();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");

    if (redirect) {
      window.history.replaceState(
        {},
        "",
        "/Final-MyPatientHUB" + redirect
      );

      window.location.reload();
    }
  }, [location]);

  return null;
}

function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const onToggleSidebar = () => {
    setSidebarCollapsed((previous) => !previous);
  };

  // Hide the dashboard header and sidebar on the login page.
  const isLoginPage = location.pathname === "/login" ||
                      location.pathname === "/";

  return (
    <div
      className={`account-layout ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <RedirectHandler />

      {!isLoginPage && (
        <Sidebar collapsed={sidebarCollapsed} />
      )}

      <main className="account-main">
        {!isLoginPage && (
          <Header
            onToggleSidebar={onToggleSidebar}
            pageTitle={
              location.pathname === "/myprofile"
                ? "My Profile"
                : location.pathname === "/settings"
                ? "Settings"
                : "Dashboard"
            }
          />
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/finddoctor" element={<FindDoctor />} />
          <Route path="/doctorlist" element={<DoctorList />} />
          <Route path="/doctormap" element={<DoctorMap />} />
          <Route path="/findclinic" element={<FindClinic />} />
          <Route path="/findcliniclist" element={<FindClinicList />} />
          <Route path="/findclinicmap" element={<FindClinicMap />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/findpharmacy" element={<FindPharmacy />} />
          <Route path="/mydependents" element={<MyDependents />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
