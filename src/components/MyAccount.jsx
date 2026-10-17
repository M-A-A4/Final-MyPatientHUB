import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import "./AccountPages.css";


const defaultProfile = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  emergencyContact: "",
  bloodGroup: "",
};

function MyAccount() {



  const [profile, setProfile] = useState(defaultProfile);
  const [formData, setFormData] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("mypatienthub-profile");

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile({ ...defaultProfile, ...parsedProfile });
        setFormData({ ...defaultProfile, ...parsedProfile });
      } catch {
        console.error("Unable to load saved profile.");
      }
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.fullName.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    const updatedProfile = {
      ...formData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
    };

    try {
      localStorage.setItem(
        "mypatienthub-profile",
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);
      setFormData(updatedProfile);
      setIsEditing(false);
      setMessage("Your profile has been saved successfully.");
    } catch {
      setMessage("Unable to save your profile in this browser.");
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setMessage("");
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
    setMessage("");
  };

  const initials = profile.fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const renderField = (
    label,
    name,
    type = "text",
    options = null
  ) => (
    <div className="account-field" key={name}>
      <label htmlFor={name}>{label}</label>

      {isEditing ? (
        options ? (
          <select
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
          >
            <option value="">Select {label.toLowerCase()}</option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            required={name === "fullName" || name === "email"}
          />
        )
      ) : (
        <p className="account-field-value">
          {profile[name] || "Not provided"}
        </p>
      )}
    </div>
  );

  
return (
  <div className="account-layout">
    <Sidebar />

    <main className="account-main">
      <Header />

        

        <div className="account-container">
          <div className="account-page-heading">
            <div>
              <span className="account-eyebrow">
                ACCOUNT MANAGEMENT
              </span>

              <h1>My Profile</h1>

              <p>
                Manage your personal information and contact details.
              </p>
            </div>

            {!isEditing && (
              <button
                type="button"
                className="account-primary-button"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            )}
          </div>

          {message && (
            <div
              className="account-message"
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          <section className="profile-summary account-card">
            <div className="profile-avatar" aria-hidden="true">
              {initials || "U"}
            </div>

            <div className="profile-summary-info">
              <h2>{profile.fullName || "Your Name"}</h2>
              <p>{profile.email}</p>
              <span className="profile-status">
                MyPatientHUB Account
              </span>
            </div>
          </section>

          <form onSubmit={handleSave}>
            <section className="account-card">
              <div className="account-section-heading">
                <div>
                  <h2>Personal Information</h2>
                  <p>Your basic personal details.</p>
                </div>
              </div>

              <div className="account-fields-grid">
                {renderField("Full Name", "fullName")}
                {renderField("Email Address", "email", "email")}
                {renderField("Phone Number", "phone", "tel")}
                {renderField("Date of Birth", "dateOfBirth", "date")}
                {renderField("Gender", "gender", "text", [
                  "Female",
                  "Male",
                  "Prefer not to say",
                ])}
                {renderField("Blood Group", "bloodGroup", "text", [
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                ])}
              </div>
            </section>

            <section className="account-card">
              <div className="account-section-heading">
                <div>
                  <h2>Contact Information</h2>
                  <p>Manage your address and emergency contact.</p>
                </div>
              </div>

              <div className="account-fields-grid">
                {renderField("Address", "address")}
                {renderField(
                  "Emergency Contact",
                  "emergencyContact",
                  "tel"
                )}
              </div>
            </section>

            {isEditing && (
              <div className="account-form-actions">
                <button
                  type="button"
                  className="account-secondary-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="account-primary-button"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>

          <div className="account-disclaimer">
            <strong>Privacy reminder</strong>
            <p>
              This demonstration stores profile information in your
              browser. Do not enter real medical or other sensitive
              personal information until secure backend storage and
              appropriate access controls have been implemented.
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default MyAccount;