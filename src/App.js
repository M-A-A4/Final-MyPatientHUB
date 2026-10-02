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

function App() {
  return (
    <BrowserRouter basename="/Final-MyPatientHUB">
      <RedirectHandler />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/finddoctor" element={<FindDoctor />} />

        <Route path="/doctorlist" element={<DoctorList />} />

        <Route path="/doctormap" element={<DoctorMap />} />

        <Route path="/findclinic" element={<FindClinic />} />

        <Route path="/findcliniclist" element={<FindClinicList />} />

        <Route path="/findclinicmap" element={<FindClinicMap />} />

        {/* NEW MARKETPLACE PAGE */}
        <Route
          path="/marketplace"
          element={<Marketplace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;