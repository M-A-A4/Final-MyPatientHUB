// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import "./project18.css";

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
// import MyAccount from "./components/MyAccount";
// import Settings from "./components/Settings";
// import Chat from "./components/Chat";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";

// function RedirectHandler() {
//   const location = useLocation();

//   React.useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const redirect = params.get("redirect");

//     if (redirect) {
//       const base =
//         window.location.hostname === "m-a-a4.github.io"
//           ? "/Final-MyPatientHUB"
//           : "";

//       window.history.replaceState(
//         {},
//         "",
//         base + redirect
//       );

//       window.location.reload();
//     }
//   }, [location]);

//   return null;
// }

// function App() {
//   const basename =
//     window.location.hostname === "m-a-a4.github.io"
//       ? "/Final-MyPatientHUB"
//       : "";

//   return (
//     <>
   
//     <BrowserRouter basename={basename}>
    
//       <RedirectHandler />
//        <Sidebar/>
//     < Header/>

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

//         <Route path="/myaccount" element={<MyAccount />} />

//         <Route path="/settings" element={<Settings />} />

//           <Route path="/chat" element={<Chat />} />
        
//       </Routes>
//     </BrowserRouter>
//     </>
//   );
// }

// export default App;







// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import "./App.css";

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
// import MyAccount from "./components/MyAccount";
// import Settings from "./components/Settings";
// import Chat from "./components/Chat";

// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";

// // Handle GitHub Pages redirects
// function RedirectHandler() {
//   const location = useLocation();

//   React.useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const redirect = params.get("redirect");

//     if (redirect) {
//       const base =
//         window.location.hostname === "m-a-a4.github.io"
//           ? "/Final-MyPatientHUB"
//           : "";

//       window.history.replaceState(
//         {},
//         "",
//         base + redirect
//       );

//       window.location.reload();
//     }
//   }, [location]);

//   return null;
// }

// // Layout shared by all dashboard pages
// function DashboardLayout() {
//   const location = useLocation();

//   // Update the header and page when the route changes
//   const pageTitles = {
//     "/dashboard": "Dashboard",
//     "/finddoctor": "Find Doctor",
//     "/doctorlist": "Doctor List",
//     "/doctormap": "Doctor Map",
//     "/findclinic": "Find Clinic",
//     "/findcliniclist": "Clinic List",
//     "/findclinicmap": "Clinic Map",
//     "/marketplace": "Marketplace",
//     "/findpharmacy": "Find Pharmacy",
//     "/mydependents": "My Dependents",
//     "/myaccount": "My Account",
//     "/settings": "Settings",
//     "/chat": "Messages",
//   };

//   const pageTitle = pageTitles[location.pathname] || "MyPatientHUB";

//   return (
//     <div className="app-layout">
//       <Sidebar />

//       <div className="app-main">
//         <Header title={pageTitle} />

//         <main className="app-page-content">
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />

//             <Route path="/finddoctor" element={<FindDoctor />} />

//             <Route path="/doctorlist" element={<DoctorList />} />

//             <Route path="/doctormap" element={<DoctorMap />} />

//             <Route path="/findclinic" element={<FindClinic />} />

//             <Route path="/findcliniclist" element={<FindClinicList />} />

//             <Route path="/findclinicmap" element={<FindClinicMap />} />

//             <Route path="/marketplace" element={<Marketplace />} />

//             <Route path="/findpharmacy" element={<FindPharmacy />} />

//             <Route path="/mydependents" element={<MyDependents />} />

//             <Route path="/myaccount" element={<MyAccount />} />

//             <Route path="/settings" element={<Settings />} />

//             <Route path="/chat" element={<Chat />} />

//             <Route
//               path="*"
//               element={<Navigate to="/dashboard" replace />}
//             />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const basename =
//     window.location.hostname === "m-a-a4.github.io"
//       ? "/Final-MyPatientHUB"
//       : "";

//   return (
//     <BrowserRouter basename={basename}>
//       <RedirectHandler />

//       <Routes>
//         {/* Login has no dashboard header or sidebar */}
//         <Route path="/login" element={<Login />} />

//         {/* Dashboard pages share one fixed layout */}
//         <Route path="/*" element={<DashboardLayout />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;














import React from "react";
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
import MyAccount from "./components/MyAccount";
import Settings from "./components/Settings";
import Chat from "./components/Chat";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Handle GitHub Pages redirects
function RedirectHandler() {
  const location = useLocation();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");

    if (redirect) {
      const base =
        window.location.hostname === "m-a-a4.github.io"
          ? "/Final-MyPatientHUB"
          : "";

      window.history.replaceState(
        {},
        "",
        base + redirect
      );

      window.location.reload();
    }
  }, [location]);

  return null;
}

// Shared layout for all dashboard pages
function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/finddoctor": "Find Doctor",
    "/doctorlist": "Doctor List",
    "/doctormap": "Doctor Map",
    "/findclinic": "Find Clinic",
    "/findcliniclist": "Clinic List",
    "/findclinicmap": "Clinic Map",
    "/marketplace": "Marketplace",
    "/findpharmacy": "Find Pharmacy",
    "/mydependents": "My Dependents",
    "/myaccount": "My Account",
    "/settings": "Settings",
    "/chat": "Messages",
  };

  const pageTitle =
    pageTitles[location.pathname] || "MyPatientHUB";

  return (
    <div
      className={`app-layout ${
        sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />

      <div className="app-main">
        <Header
          title={pageTitle}
          toggleSidebar={toggleSidebar}
        />

        <main className="app-page-content">
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/finddoctor"
              element={<FindDoctor />}
            />

            <Route
              path="/doctorlist"
              element={<DoctorList />}
            />

            <Route
              path="/doctormap"
              element={<DoctorMap />}
            />

            <Route
              path="/findclinic"
              element={<FindClinic />}
            />

            <Route
              path="/findcliniclist"
              element={<FindClinicList />}
            />

            <Route
              path="/findclinicmap"
              element={<FindClinicMap />}
            />

            <Route
              path="/marketplace"
              element={<Marketplace />}
            />

            <Route
              path="/findpharmacy"
              element={<FindPharmacy />}
            />

            <Route
              path="/mydependents"
              element={<MyDependents />}
            />

            <Route
              path="/myaccount"
              element={<MyAccount />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/chat"
              element={<Chat />}
            />

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Main application
function App() {
  const basename =
    window.location.hostname === "m-a-a4.github.io"
      ? "/Final-MyPatientHUB"
      : "";

  return (
    <BrowserRouter basename={basename}>
      <RedirectHandler />

      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/*"
          element={<DashboardLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

