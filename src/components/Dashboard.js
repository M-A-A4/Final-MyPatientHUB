import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim() === "") {
      alert("Please enter something to search.");
    } else {
      alert("Searching for: " + searchText);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const cards = [
    {
      title: "Promotion by Clinics",
      image: "/images/one.jpeg",
    },
    {
      title: "Promotion by Pharmacies",
      image: "/images/two.jpeg",
    },
    {
      title: "Smart Market Use by App",
      image: "/images/three.jpeg",
    },
    {
      title: "Health Index",
      image: "/images/four.jpeg",
    },
  ];

  return (
    <div className="dashboard-container">

      <Sidebar />

      <main className="content">

        <div className="topbar">

          <div className="top-actions">

            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <button onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>

          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

        <section className="welcome">

          <h1>Welcome to MyPatientHUB</h1>

          <p>
            Manage your healthcare services easily and conveniently.
          </p>

        </section>

        <section className="cards">

          {cards.map((card, index) => (
            <div className="card" key={index}>

              <h3>{card.title}</h3>

              <img
                src={card.image}
                alt={card.title}
              />

            </div>
          ))}

        </section>

        <Footer />

      </main>

    </div>
  );
}

export default Dashboard;