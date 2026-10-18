import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./project18.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
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

const titles = {
  "/dashboard":"Dashboard", "/finddoctor":"Find Doctor", "/doctorlist":"Doctor List",
  "/doctormap":"Doctor Map", "/findclinic":"Find Clinic", "/findcliniclist":"Clinic List",
  "/findclinicmap":"Clinic Map", "/marketplace":"Marketplace", "/findpharmacy":"Find Pharmacy",
  "/mydependents":"My Dependents", "/myaccount":"My Account", "/settings":"Settings", "/chat":"Messages"
};
function AppShell() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = titles[location.pathname] || "MyPatientHUB";
  return <div className={`dashboard-container app-layout ${collapsed ? "sidebar-collapsed" : ""} ${mobileOpen ? "mobile-sidebar-open" : ""}`}>
    <Sidebar onNavigate={() => setMobileOpen(false)} />
    <div className="app-main">
      <Header title={title} toggleSidebar={() => {
        if (window.matchMedia("(max-width: 760px)").matches) setMobileOpen(v => !v);
        else setCollapsed(v => !v);
      }} />
      <main className="app-page-content">
        <Routes>
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
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  </div>;
}
function App() {
  const basename = window.location.hostname === "m-a-a4.github.io" ? "/Final-MyPatientHUB" : "";
  return <BrowserRouter basename={basename}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/*" element={<AppShell />} />
    </Routes>
  </BrowserRouter>;
}
export default App;
