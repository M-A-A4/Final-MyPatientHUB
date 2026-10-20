
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Settings.css";
function Settings() {
  const navigate = useNavigate();
  const pageTop = useRef(null);

  const [activeTab, setActiveTab] = useState("Basic Info");
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(true);

  const [profile, setProfile] = useState({
    firstName: "Azam",
    lastName: "Shah",
    gender: "Male",
    month: "February",
    day: "1",
    year: "2001",
    email: "",
    bloodGroup: "A+",
    location: "Kabul, Afghanistan",
    phone: "",
    height: "",
    weight: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [twoFactor, setTwoFactor] = useState(true);
  const [sms, setSms] = useState("+93700000000");
  const [authenticator, setAuthenticator] = useState(false);
  const [securityKey, setSecurityKey] = useState(false);
  const [confirmedDelete, setConfirmedDelete] = useState(false);

  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Kabul, Afghanistan",
      country: "AF",
      current: true,
      icon: "fa-desktop",
    },
    {
      id: 2,
      device: "Chrome on macOS",
      location: "United States",
      country: "US",
      current: false,
      icon: "fa-desktop",
    },
    {
      id: 3,
      device: "Safari on iPhone",
      location: "United States",
      country: "US",
      current: false,
      icon: "fa-mobile-screen-button",
    },
  ]);

  const settingsItems = [
    { name: "Profile", icon: "fa-user" },
    { name: "Basic Info", icon: "fa-address-card" },
    { name: "Change Password", icon: "fa-cube" },
    { name: "2FA", icon: "fa-lock" },
    { name: "Sessions", icon: "fa-screwdriver-wrench" },
    { name: "Delete Account", icon: "fa-credit-card" },
  ];

  const updateProfile = (event) => {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
  };

  const updatePassword = (event) => {
    const { name, value } = event.target;
    setPasswords((previous) => ({ ...previous, [name]: value }));
  };

  const goToSection = (name) => {
    setActiveTab(name);

    const element = document.getElementById(
      "settings-" + name.toLowerCase().replaceAll(" ", "-")
    );

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToTop = () => {
    pageTop.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!searchText.trim()) {
      alert("Please enter something to search.");
      return;
    }

    const found = settingsItems.find((item) =>
      item.name.toLowerCase().includes(searchText.trim().toLowerCase())
    );

    if (found) {
      goToSection(found.name);
    } else {
      alert("No matching settings section found.");
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (!passwords.current) {
      alert("Please enter your current password.");
      return;
    }

    if (passwords.next.length < 6) {
      alert("Your new password must contain at least 6 characters.");
      return;
    }

    if (!/[0-9]/.test(passwords.next)) {
      alert("Please include at least one number in your new password.");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(passwords.next)) {
      alert("Please include at least one special character.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      alert("Your new password and confirmation do not match.");
      return;
    }

    alert(
      "Password form validated. Connect a secure backend to save your new password."
    );

    setPasswords({ current: "", next: "", confirm: "" });
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      alert("Please enter a valid email address, such as azam@example.com.");
      return;
    }

    alert("Your profile information is ready to save.");
  };

  const handleDeleteAccount = () => {
    if (!confirmedDelete) {
      alert("Please confirm that you want to delete your account.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmed) {
      alert(
        "Account deletion requires a secure backend. No account has been deleted."
      );
    }
  };

  const removeSession = (id) => {
    const session = sessions.find((item) => item.id === id);

    if (!session || session.current) {
      alert("You cannot remove your current session here.");
      return;
    }

    if (window.confirm("Remove this device from the session list?")) {
      setSessions((previous) =>
        previous.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div className="dashboard-container settings-dashboard">
      

      <main className="content">
          

    
        <div className="settings-layout">
          <aside className="settings-navigation">
            {settingsItems.map((item) => (
              <button
                type="button"
                key={item.name}
                className={
                  "settings-nav-item" +
                  (activeTab === item.name ? " active" : "")
                }
                onClick={() => goToSection(item.name)}
              >
                <i className={"fa-solid " + item.icon}></i>
                <span>{item.name}</span>
              </button>
            ))}
          </aside>

          <div className="settings-main">
            <section
              className="settings-profile-card"
              id="settings-profile"
            >
              <img
                className="settings-avatar"
                src={process.env.PUBLIC_URL + "/images/azam.jpg"}
                alt="Azam Shah"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="settings-profile-name">
                <h2>{profile.firstName} {profile.lastName}</h2>
                <p>Patient</p>
              </div>

              <label className="visibility-control">
                <span>{visible ? "Switch to invisible" : "Switch to visible"}</span>
                <input
                  type="checkbox"
                  checked={!visible}
                  onChange={(event) => setVisible(!event.target.checked)}
                  aria-label="Toggle profile visibility"
                />
                <span className="visibility-slider"></span>
              </label>
            </section>

            <section
              className="settings-card"
              id="settings-basic-info"
            >
              <h2>Basic Info</h2>

              <form onSubmit={handleProfileSubmit}>
                <div className="settings-form-grid">
                  <div className="settings-field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={profile.firstName}
                      onChange={updateProfile}
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div className="settings-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={profile.lastName}
                      onChange={updateProfile}
                      placeholder="Last Name"
                      required
                    />
                  </div>

                  <div className="settings-field">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={profile.gender}
                      onChange={updateProfile}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="settings-field settings-birth-field">
                    <label>Birth Date</label>
                    <div className="settings-birth-selects">
                      <select
                        aria-label="Birth month"
                        name="month"
                        value={profile.month}
                        onChange={updateProfile}
                      >
                        {[
                          "January", "February", "March", "April",
                          "May", "June", "July", "August",
                          "September", "October", "November", "December",
                        ].map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>

                      <select
                        aria-label="Birth day"
                        name="day"
                        value={profile.day}
                        onChange={updateProfile}
                      >
                        {Array.from({ length: 31 }, (_, index) => (
                          <option key={index + 1} value={String(index + 1)}>
                            {index + 1}
                          </option>
                        ))}
                      </select>

                      <select
                        aria-label="Birth year"
                        name="year"
                        value={profile.year}
                        onChange={updateProfile}
                      >
                        {Array.from({ length: 127 }, (_, index) => 2026 - index).map(
                          (year) => (
                            <option key={year} value={String(year)}>
                              {year}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="settings-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={updateProfile}
                      placeholder="example@email.com"
                      autoComplete="email"
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                      title="Enter a valid email address, such as azam@example.com"
                    />
                  </div>

                  <div className="settings-field">
                    <label htmlFor="bloodGroup">Blood Group</label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={profile.bloodGroup}
                      onChange={updateProfile}
                    >
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map(
                        (group) => (
                          <option key={group} value={group}>{group}</option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="settings-field">
                    <label htmlFor="location">Your Location</label>
                    <input
                      id="location"
                      name="location"
                      value={profile.location}
                      onChange={updateProfile}
                      placeholder="Your location"
                    />
                  </div>

                  <div className="settings-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={updateProfile}
                      placeholder="+93 700 000 000"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="settings-field">
                    <label htmlFor="height">Height</label>
                    <input
                      id="height"
                      name="height"
                      value={profile.height}
                      onChange={updateProfile}
                      placeholder="Height (e.g. 170 cm)"
                    />
                  </div>

                  <div className="settings-field">
                    <label htmlFor="weight">Weight</label>
                    <input
                      id="weight"
                      name="weight"
                      value={profile.weight}
                      onChange={updateProfile}
                      placeholder="Weight (e.g. 65 kg)"
                    />
                  </div>
                </div>

                <div className="settings-form-actions">
                  <button className="settings-primary-button" type="submit">
                    SAVE CHANGES
                  </button>
                </div>
              </form>
            </section>

            <section
              className="settings-card"
              id="settings-change-password"
            >
              <h2>Change Password</h2>

              <form onSubmit={handlePasswordSubmit}>
                <div className="settings-field settings-full-field">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    id="currentPassword"
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={updatePassword}
                    placeholder="Current Password"
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="settings-field settings-full-field">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    name="next"
                    value={passwords.next}
                    onChange={updatePassword}
                    placeholder="New Password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </div>

                <div className="settings-field settings-full-field">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={updatePassword}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div className="password-requirements">
                  <h3>Password requirements</h3>
                  <p>Please follow this guide for a strong password</p>
                  <ul>
                    <li>One special character</li>
                    <li>Minimum 6 characters</li>
                    <li>One number (2 are recommended)</li>
                    <li>Change it often</li>
                  </ul>
                </div>

                <div className="settings-form-actions">
                  <button className="settings-primary-button" type="submit">
                    UPDATE PASSWORD
                  </button>
                </div>
              </form>
            </section>

            <section className="settings-card" id="settings-2fa">
              <div className="settings-card-heading">
                <h2>Two-factor authentication</h2>
                <span className={twoFactor ? "status-enabled" : "status-disabled"}>
                  {twoFactor ? "ENABLED" : "DISABLED"}
                </span>
              </div>

              <div className="settings-option-row">
                <span>Security keys</span>
                <div className="settings-option-actions">
                  <span>{securityKey ? "Security key added" : "No Security keys"}</span>
                  <button
                    className="settings-outline-button"
                    type="button"
                    onClick={() => {
                      setSecurityKey(!securityKey);
                      alert(
                        securityKey
                          ? "Security key removed from this demo."
                          : "Demo security key added. Real key registration needs backend support."
                      );
                    }}
                  >
                    {securityKey ? "REMOVE" : "ADD"}
                  </button>
                </div>
              </div>

              <div className="settings-option-row">
                <span>SMS number</span>
                <div className="settings-option-actions">
                  <span>{sms || "Not configured"}</span>
                  <button
                    className="settings-outline-button"
                    type="button"
                    onClick={() => {
                      const number = window.prompt("Enter your SMS phone number:", sms);
                      if (number !== null) setSms(number.trim());
                    }}
                  >
                    EDIT
                  </button>
                </div>
              </div>

              <div className="settings-option-row">
                <span>Authenticator app</span>
                <div className="settings-option-actions">
                  <span>{authenticator ? "Configured" : "Not Configured"}</span>
                  <button
                    className="settings-outline-button"
                    type="button"
                    onClick={() => {
                      setAuthenticator(!authenticator);
                      alert(
                        authenticator
                          ? "Authenticator disabled in this demo."
                          : "Setup selected. A real authenticator needs a server-generated secret and QR code."
                      );
                    }}
                  >
                    {authenticator ? "DISABLE" : "SET UP"}
                  </button>
                </div>
              </div>

              <div className="settings-twofactor-toggle">
                <span>Two-factor authentication</span>
                <button
                  type="button"
                  className={twoFactor ? "settings-toggle on" : "settings-toggle"}
                  onClick={() => setTwoFactor(!twoFactor)}
                  aria-label="Toggle two-factor authentication"
                  aria-pressed={twoFactor}
                >
                  <span></span>
                </button>
              </div>
            </section>

            <section className="settings-card" id="settings-sessions">
              <h2>Sessions</h2>
              <p className="settings-card-description">
                This is a list of devices that have logged into your account.
                Remove those that you do not recognize.
              </p>

              <div className="settings-sessions-list">
                {sessions.map((session) => (
                  <div className="settings-session-row" key={session.id}>
                    <i className={"fa-solid " + session.icon + " session-device-icon"}></i>

                    <div className="session-device-info">
                      <span>{session.device}</span>
                      <small>{session.current ? "Your current session" : session.location}</small>
                    </div>

                    <div className="session-meta">
                      {session.current && (
                        <span className="status-enabled">ACTIVE</span>
                      )}
                      <span className="session-country">{session.country}</span>
                      <button
                        type="button"
                        className="session-see-more"
                        onClick={() => {
                          goToTop();
                          setActiveTab("Profile");
                        }}
                      >
                        See more <i className="fa-solid fa-arrow-right"></i>
                      </button>
                      {!session.current && (
                        <button
                          type="button"
                          className="session-remove"
                          onClick={() => removeSession(session.id)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="settings-card settings-delete-card"
              id="settings-delete-account"
            >
              <h2>Delete Account</h2>
              <p className="settings-card-description">
                Once you delete your account, there is no going back. Please be certain.
              </p>

              <div className="delete-account-row">
                <label className="delete-confirm">
                  <input
                    type="checkbox"
                    checked={confirmedDelete}
                    onChange={(event) => setConfirmedDelete(event.target.checked)}
                  />
                  <span className="visibility-slider"></span>
                  <span>
                    <strong>Confirm</strong>
                    <small>I want to delete my account.</small>
                  </span>
                </label>

                <div className="delete-buttons">
                  <button
                    className="settings-outline-button"
                    type="button"
                    onClick={() => setConfirmedDelete(false)}
                  >
                    DEACTIVATE
                  </button>

                  <button
                    className="settings-danger-button"
                    type="button"
                    onClick={handleDeleteAccount}
                  >
                    DELETE ACCOUNT
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Footer />
      </main>
     
    </div>
  );
}

export default Settings;
