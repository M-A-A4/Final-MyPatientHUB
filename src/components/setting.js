import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import "./AccountPages.css";

const defaultSettings = {
  appointmentNotifications: true,
  emailUpdates: false,
  healthReminders: true,
  compactDashboard: false,
  showProfileSummary: true,
  shareUsageAnalytics: false,
};

function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedSettings = localStorage.getItem(
      "mypatienthub-settings"
    );

    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);

        setSettings({
          ...defaultSettings,
          ...parsedSettings,
        });
      } catch {
        console.error("Unable to load saved settings.");
      }
    }
  }, []);

  const handleToggle = (event) => {
    const { name, checked } = event.target;

    setSettings((previousSettings) => ({
      ...previousSettings,
      [name]: checked,
    }));

    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(
        "mypatienthub-settings",
        JSON.stringify(settings)
      );

      setMessage("Your settings have been saved successfully.");
    } catch {
      setMessage("Unable to save settings in this browser.");
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);

    try {
      localStorage.setItem(
        "mypatienthub-settings",
        JSON.stringify(defaultSettings)
      );

      setMessage("Settings have been restored to their defaults.");
    } catch {
      setMessage("Unable to reset settings in this browser.");
    }
  };

  const renderToggle = (title, description, name) => (
    <div className="settings-option" key={name}>
      <div className="settings-option-text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <label className="settings-switch">
        <input
          type="checkbox"
          name={name}
          checked={settings[name]}
          onChange={handleToggle}
          aria-label={title}
        />

        <span className="settings-slider" />
      </label>
    </div>
  );

  return (
    <div className="account-layout">
    

      <main className="account-main">
        <div className="account-container">
          <div className="account-page-heading">
            <div>
              <span className="account-eyebrow">
                PREFERENCES
              </span>

              <h1>Settings</h1>

              <p>
                Customize your MyPatientHUB experience and preferences.
              </p>
            </div>
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

          <form onSubmit={handleSave}>
            <section className="account-card settings-section">
              <div className="account-section-heading">
                <div>
                  <h2>Notifications</h2>
                  <p>Choose which reminders you want to receive.</p>
                </div>

                <span className="settings-section-icon" aria-hidden="true">
                  ♧
                </span>
              </div>

              {renderToggle(
                "Appointment Notifications",
                "Receive reminders about upcoming appointments.",
                "appointmentNotifications"
              )}

              {renderToggle(
                "Email Updates",
                "Enable email updates about your account.",
                "emailUpdates"
              )}

              {renderToggle(
                "Health Reminders",
                "Enable reminders for health-related activities.",
                "healthReminders"
              )}
            </section>

            <section className="account-card settings-section">
              <div className="account-section-heading">
                <div>
                  <h2>Dashboard Preferences</h2>
                  <p>Customize how information appears on your dashboard.</p>
                </div>

                <span className="settings-section-icon" aria-hidden="true">
                  ▦
                </span>
              </div>

              {renderToggle(
                "Compact Dashboard",
                "Use a more compact layout for dashboard content.",
                "compactDashboard"
              )}

              {renderToggle(
                "Show Profile Summary",
                "Display your profile summary on the dashboard.",
                "showProfileSummary"
              )}
            </section>

            <section className="account-card settings-section">
              <div className="account-section-heading">
                <div>
                  <h2>Privacy Preferences</h2>
                  <p>Control optional data-sharing preferences.</p>
                </div>

                <span className="settings-section-icon" aria-hidden="true">
                  ◈
                </span>
              </div>

              {renderToggle(
                "Share Usage Analytics",
                "Allow optional, non-medical usage analytics.",
                "shareUsageAnalytics"
              )}

              <div className="settings-note">
                <strong>Note:</strong> These preferences are stored
                locally in this browser. They do not configure server-side
                notifications, analytics, or privacy permissions.
              </div>
            </section>

            <div className="account-form-actions">
              <button
                type="button"
                className="account-secondary-button"
                onClick={handleReset}
              >
                Reset Defaults
              </button>

              <button
                type="submit"
                className="account-primary-button"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Settings;