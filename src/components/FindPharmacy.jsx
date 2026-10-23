import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./FindPharmacy.css";
function FindPharmacy() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(25);



  const pharmacies = [
    {
      pharmacy: "Carry Medical",
      image: process.env.PUBLIC_URL + "/images/ph1.jpg",
      price: "10 RM",
            image1: process.env.PUBLIC_URL + "/images/drug1.png",
    },
    {
      pharmacy: "Pool Medical",
      image: process.env.PUBLIC_URL + "/images/ph2.jpg",
      price: "9 RM",
            image1: process.env.PUBLIC_URL + "/images/drug2.png",
    },
   {
  pharmacy: "OK Pharmacy",
  image: process.env.PUBLIC_URL + "/images/ph3.jpg",
  price: "8 RM",
  image1: process.env.PUBLIC_URL + "/images/drug4.png",
},
    {
      pharmacy: "Hamza Pharma",
      image: process.env.PUBLIC_URL + "/images/ph4.jpg",
      price: "11 RM",
            image1: process.env.PUBLIC_URL + "/images/drug3.png",
    },
  ];

  const medicines = [
    {
      id: "8234",
      name: "Esso",
      category: "Tablet",
      service: "Caring Pharmacy",
      discount: "1",
      price: "5 RM",
            image: process.env.PUBLIC_URL + "/images/drug1.png",
    },
    {
      id: "872",
      name: "Esso",
      category: "Tablet",
      service: "OK Pharmacy",
      discount: "3",
      price: "9 RM",
            image: process.env.PUBLIC_URL + "/images/drug2.png",
    },
    {
      id: "0134",
      name: "Esso",
      category: "Tablet",
      service: "Hilton Medical",
      discount: "5",
      price: "7 RM",
            image: process.env.PUBLIC_URL + "/images/drug3.png",
    },
    {
      id: "113",
      name: "Esso",
      category: "Tablet",
      service: "Hinucion Pharma",
      discount: "5",
      price: "9 RM",
            image: process.env.PUBLIC_URL + "/images/drug4.png",
    },
    {
      id: "629",
      name: "Esso",
      category: "Tablet",
      service: "Hamza Medical Pharmacy",
      discount: "7",
      price: "20 RM",
            image: process.env.PUBLIC_URL + "/images/drug1.png",
    },
    {
      id: "634729",
      name: "Esso",
      category: "Tablet",
      service: "Food Panda",
      discount: "0",
      price: "20 RM",
            image: process.env.PUBLIC_URL + "/images/drug2.png",
    },
  ];

  const filteredMedicines = medicines.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.service.toLowerCase().includes(searchText.toLowerCase())
  );

  const visibleMedicines = filteredMedicines.slice(
    0,
    entriesPerPage
  );

  return (
    <div className="pharmacy-page">

      

       <main className="content">
          

      <div className="pharmacy-main">

        <div className="pharmacy-title">
          <h1>Search Pharmacies for Medicines</h1>
        </div>

        <div className="pharmacy-cards">

          {pharmacies.map((item, index) => (

            <div className="pharmacy-card" key={index}>

              <img
                src={item.image1}
                alt="Esso"
              />

              <p>Esomeprazole</p>

              <div className="price">
                {item.price}
              </div>

              <div className="pharmacy-info">

                <img
                  src={item.image}
                  alt={item.pharmacy}
                  className="pharmacy-logo"
                />

                <div>
                  <h4>{item.pharmacy}</h4>
                  <p>Excellent Quality Drugs</p>
                </div>

              </div>

              <button
                className="buy-btn"
                onClick={() => navigate("/login")}
              >
                BUY NOW
              </button>

            </div>

          ))}

        </div>

        <div className="pharmacy-table-section">

          <h2>
            6 Medicine returned for the keyword Esso
          </h2>

          <div className="table-controls">

            <div className="entries-control">

              <select
                value={entriesPerPage}
                onChange={(e) =>
                  setEntriesPerPage(
                    Number(e.target.value)
                  )
                }
              >
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>

              <span>entries per page</span>

            </div>

            <input
              type="text"
              placeholder="Search..."
              className="table-search"
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

          </div>

          <table className="pharmacy-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Service By</th>
                <th>Discount</th>
                <th>Price</th>
                <th>ID</th>
              </tr>
            </thead>

            <tbody>

              {visibleMedicines.map((item, index) => (

                <tr key={index}>

                  <td>
                    <div className="medicine-name">

                      <img
                        src={item.image}
                        alt="Esso"
                        className="medicine-img"
                      />

                      <span>{item.name}</span>

                    </div>
                  </td>

                  <td>{item.category}</td>

                  <td>

                    <div className="service-box">

                      <img
                        src={
                          item.service === "Caring Pharmacy"
                            ? process.env.PUBLIC_URL + "/images/ph1.jpg"
                            : item.service === "OK Pharmacy"
                            ? process.env.PUBLIC_URL + "/images/ph2.jpg"
                            : item.service === "Hilton Medical"
                            ? process.env.PUBLIC_URL + "/images/ph3.jpg"
                            : process.env.PUBLIC_URL + "/images/ph4.jpg"
                        }
                        alt={item.service}
                        className="service-img"
                      />

                      <span>{item.service}</span>

                    </div>

                  </td>

                  <td>{item.discount}</td>
                  <td>{item.price}</td>
                  <td>{item.id}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <Footer />

      </div>
      </main>

    </div>
  );
}

export default FindPharmacy;