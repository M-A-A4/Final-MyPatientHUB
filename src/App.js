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
import Settings from "./components/Settings";

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

function App() {
  const basename =
    window.location.hostname === "m-a-a4.github.io"
      ? "/Final-MyPatientHUB"
      : "";

  return (
    <BrowserRouter basename={basename}>
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

        <Route path="/marketplace" element={<Marketplace />} />

        <Route path="/findpharmacy" element={<FindPharmacy />} />

        <Route path="/mydependents" element={<MyDependents />} />

        <Route path="/settings" element={<Settings />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;