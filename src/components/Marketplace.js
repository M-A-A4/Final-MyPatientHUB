import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../Marketplace.css";

function Marketplace() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(7);

  const handleLogout = () => {
    navigate("/login");
  };

  const marketplaceCards = [
    {
      title: "Food Panda",
      price: "5 RM",
      image: process.env.PUBLIC_URL + "/images/food.jpeg",
    },
    {
      title: "Grab Food",
      price: "10 RM",
      image: process.env.PUBLIC_URL + "/images/food.jpeg",
    },
    {
      title: "Deliveroo",
      price: "15 RM",
      image: process.env.PUBLIC_URL + "/images/food.jpeg",
    },
    {
      title: "Minimalist",
      price: "20 RM",
      image: process.env.PUBLIC_URL + "/images/food.jpeg",
    },
  ];

  const products = [
    {
      id: "243598234",
      name: "Healthy Diet",
      category: "Food",
      service: "Food Panda",
      discount: "0",
      price: "10 RM",
    },
    {
      id: "877712",
      name: "Healthy Diet",
      category: "Food",
      service: "Grab Food",
      discount: "5",
      price: "9 RM",
    },
    {
      id: "0134729",
      name: "Healthy Diet",
      category: "Food",
      service: "Deliveroo",
      discount: "9",
      price: "25 RM",
    },
    {
      id: "113213",
      name: "Healthy Diet",
      category: "Food",
      service: "Food Panda",
      discount: "5",
      price: "15 RM",
    },
    {
      id: "634729",
      name: "Healthy Diet",
      category: "Food",
      service: "Food Panda",
      discount: "7",
      price: "25 RM",
    },
    {
      id: "6347292",
      name: "Healthy Diet",
      category: "Food",
      service: "Food Panda",
      discount: "0",
      price: "20 RM",
    },
  ];

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase()) ||
      item.service.toLowerCase().includes(searchText.toLowerCase())
  );

  const visibleProducts = filteredProducts.slice(
    0,
    entriesPerPage
  );

  return (
    <div className="marketplace-page">

      <Sidebar />

      <div className="marketplace-main">

        <div className="marketplace-header">

          <div className="marketplace-search">

            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

            <button
            onClick={() => {
                if (searchText.trim() === "") {
                alert("Please enter something to search.");
                }
            }}
            >
            Search
            </button>

          </div>

          <button
            className="marketplace-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        <div className="marketplace-title">

          <h1>Marketplace</h1>

          <p>
            Search marketplaces and order what you need.
          </p>

        </div>

        <div className="marketplace-cards">

          {marketplaceCards.map((card, index) => (

            <div
              className="marketplace-card"
              key={index}
            >

              <img
                src={card.image}
                alt={card.title}
              />

              <div className="marketplace-card-info">

                <div className="marketplace-card-top">

                  <h3>{card.title}</h3>

                  <span>{card.price}</span>

                </div>

                <p>Healthy Diet</p>

                <button
                className="buy-btn"
                onClick={() => navigate("/login")}
                >
                Buy Now
                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="marketplace-table-section">

          <h2>Other Results</h2>

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

          <table className="marketplace-table">

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

              {visibleProducts.map((item, index) => (

                <tr key={index}>
                  <td>
                    <div className="product-name">
                        <img
                        src={process.env.PUBLIC_URL + "/images/food.jpeg"}
                        alt="Food"
                        className="product-img"
                        />
                        <span>{item.name}</span>
                    </div>
                    </td>
                  <td>{item.category}</td>
                  <td>{item.service}</td>
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

    </div>
  );
}

export default Marketplace;