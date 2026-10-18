import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import "./myaccount.css";

// Default profile information
const defaultProfile = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  emergencyContact: "",
  bloodGroup: "",
  profilePhoto: "",
};

function MyAccount() {
  const [profile, setProfile] = useState(defaultProfile);
  const [formData, setFormData] = useState(defaultProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Load the saved profile when the page opens
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(
        "mypatienthub-profile"
      );

      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);

        const updatedProfile = {
          ...defaultProfile,
          ...parsedProfile,
        };

        setProfile(updatedProfile);
        setFormData(updatedProfile);
      }
    } catch (error) {
      console.error("Unable to load profile:", error);
    }
  }, []);

  // Update the form when a field changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Upload and preview a profile photo
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Accept image files only
    if (!file.type.startsWith("image/")) {
      setMessageType("error");
      setMessage("Please select a valid image.");
      event.target.value = "";
      return;
    }

    // Limit the image to 1.5 MB
    if (file.size > 1.5 * 1024 * 1024) {
      setMessageType("error");
      setMessage("Please select an image smaller than 1.5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((previousData) => ({
        ...previousData,
        profilePhoto: reader.result,
      }));

      setMessage("");
    };

    reader.onerror = () => {
      setMessageType("error");
      setMessage("Unable to read this image. Please try another.");
    };

    reader.readAsDataURL(file);
  };

  // Calculate profile completion
  const profileFields = [
    "fullName",
    "email",
    "phone",
    "dateOfBirth",
    "gender",
    "address",
    "emergencyContact",
    "bloodGroup",
  ];

  const completedFields = profileFields.filter((field) =>
    String(profile[field] || "").trim()
  ).length;

  const completionPercentage = Math.round(
    (completedFields / profileFields.length) * 100
  );

  // Generate initials when there is no photo
  const initials = profile.fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  // Save profile changes
  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.fullName.trim()) {
      setMessageType("error");
      setMessage("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setMessageType("error");
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

      setMessageType("success");
      setMessage("Your profile has been updated successfully.");
    } catch (error) {
      setMessageType("error");

      setMessage(
        "Unable to save your profile. Try using a smaller photo."
      );
    }
  };

  // Start editing
  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
    setMessage("");
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setMessage("");
  };

  // Remove the current photo
  const handleRemovePhoto = () => {
    setFormData((previousData) => ({
      ...previousData,
      profilePhoto: "",
    }));
  };

  // Reusable form field
  const renderField = (
    label,
    name,
    type = "text",
    options = null
  ) => {
    return (
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
              <option value="">
                Select {label.toLowerCase()}
              </option>

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
              required={
                name === "fullName" || name === "email"
              }
            />
          )
        ) : (
          <p className="account-field-value">
            {profile[name] || "Not provided"}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="account-layout">
  

      <main className="account-main">
        <Header />

        <div className="account-container">

          {/* Page heading */}
          <div className="account-page-heading">
            <div>
              <span className="account-eyebrow">
                ACCOUNT MANAGEMENT
              </span>

              <h1>My Profile</h1>

              <p>
                Manage your identity, personal details, and
                healthcare contact information.
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

          {/* Success or error message */}
          {message && (
            <div
              className={`account-message ${messageType}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          {/* Profile cover and identity */}
          <section className="advanced-profile-card">

            <div className="profile-cover">
              <div className="profile-cover-content">
                <span className="profile-cover-label">
                  MYPATIENTHUB
                </span>

                <h2>Your health, your profile.</h2>

                <p>
                  Keep your personal information organized
                  in one place.
                </p>
              </div>

              <div className="profile-cover-decoration">
                +
              </div>
            </div>

            <div className="advanced-profile-details">

              {/* Profile photo */}
              <div className="advanced-profile-photo">
                {formData.profilePhoto ? (
                  <img
                    src={formData.profilePhoto}
                    alt="Profile"
                    className="profile-photo-image"
                  />
                ) : (
                  <div className="profile-photo-placeholder">
                    {initials || "U"}
                  </div>
                )}

                {isEditing && (
                  <label
                    className="profile-photo-upload"
                    htmlFor="profilePhoto"
                    title="Upload profile photo"
                  >
                    <span aria-hidden="true">✎</span>
                    <span className="visually-hidden">
                      Upload profile photo
                    </span>
                  </label>
                )}
              </div>

              {/* Photo controls */}
              {isEditing && (
                <div className="profile-photo-controls">
                  <label
                    className="profile-upload-link"
                    htmlFor="profilePhoto"
                  >
                    Upload photo
                  </label>

                  {formData.profilePhoto && (
                    <button
                      type="button"
                      className="profile-remove-link"
                      onClick={handleRemovePhoto}
                    >
                      Remove
                    </button>
                  )}

                  <input
                    id="profilePhoto"
                    className="profile-photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />

                  <p>JPG, PNG or WebP. Maximum 1.5 MB.</p>
                </div>
              )}

              {/* Profile identity */}
              <div className="advanced-profile-identity">
                <h2>
                  {profile.fullName || "Complete Your Profile"}
                </h2>

                <p className="profile-email">
                  {profile.email || "Add your email address"}
                </p>

                <div className="advanced-profile-badges">
                  <span className="profile-status">
                    MyPatientHUB Account
                  </span>

                  <span className="profile-member-badge">
                    Patient Profile
                  </span>
                </div>
              </div>

              {/* Completion indicator */}
              <div className="profile-completion">
                <div className="profile-completion-heading">
                  <span>Profile completion</span>
                  <strong>{completionPercentage}%</strong>
                </div>

                <div
                  className="profile-progress-track"
                  role="progressbar"
                  aria-label="Profile completion"
                  aria-valuenow={completionPercentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="profile-progress-value"
                    style={{
                      width: `${completionPercentage}%`,
                    }}
                  />
                </div>

                <p>
                  {completedFields} of {profileFields.length}{" "}
                  information fields completed
                </p>
              </div>
            </div>
          </section>

          {/* Profile form */}
          <form onSubmit={handleSave}>

            {/* Personal information */}
            <section className="account-card">
              <div className="account-section-heading">
                <div className="account-section-icon">
                  P
                </div>

                <div>
                  <h2>Personal Information</h2>

                  <p>
                    Your basic personal and identification details.
                  </p>
                </div>
              </div>

              <div className="account-fields-grid">
                {renderField("Full Name", "fullName")}

                {renderField(
                  "Email Address",
                  "email",
                  "email"
                )}

                {renderField(
                  "Phone Number",
                  "phone",
                  "tel"
                )}

                {renderField(
                  "Date of Birth",
                  "dateOfBirth",
                  "date"
                )}

                {renderField("Gender", "gender", "text", [
                  "Female",
                  "Male",
                  "Prefer not to say",
                ])}

                {renderField(
                  "Blood Group",
                  "bloodGroup",
                  "text",
                  [
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                  ]
                )}
              </div>
            </section>

            {/* Contact information */}
            <section className="account-card">
              <div className="account-section-heading">
                <div className="account-section-icon">
                  C
                </div>

                <div>
                  <h2>Contact Information</h2>

                  <p>
                    Manage your address and emergency contact.
                  </p>
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

            {/* Form buttons */}
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

          {/* Privacy information */}
          <section className="advanced-privacy-card">
            <div className="privacy-icon" aria-hidden="true">
              !
            </div>

            <div>
              <h3>Protect your personal information</h3>

              <p>
                This demonstration stores profile information
                in your browser. Profile photos are stored as
                image data in localStorage. For a production
                healthcare application, use secure server-side
                storage, appropriate access controls, and
                suitable privacy protections.
              </p>
            </div>
          </section>

        </div>

        <Footer />
      </main>
    </div>
  );
}

export default MyAccount;









// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import Header from "./Header";
// import "./AccountPages.css";


// const defaultProfile = {
//   fullName: "",
//   email: "",
//   phone: "",
//   dateOfBirth: "",
//   gender: "",
//   address: "",
//   emergencyContact: "",
//   bloodGroup: "",
// };

// function MyAccount() {



//   const [profile, setProfile] = useState(defaultProfile);
//   const [formData, setFormData] = useState(defaultProfile);
//   const [isEditing, setIsEditing] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const savedProfile = localStorage.getItem("mypatienthub-profile");

//     if (savedProfile) {
//       try {
//         const parsedProfile = JSON.parse(savedProfile);

//         setProfile({ ...defaultProfile, ...parsedProfile });
//         setFormData({ ...defaultProfile, ...parsedProfile });
//       } catch {
//         console.error("Unable to load saved profile.");
//       }
//     }
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((previousData) => ({
//       ...previousData,
//       [name]: value,
//     }));
//   };

//   const handleSave = (event) => {
//     event.preventDefault();

//     if (!formData.fullName.trim()) {
//       setMessage("Please enter your full name.");
//       return;
//     }

//     if (!formData.email.trim()) {
//       setMessage("Please enter your email address.");
//       return;
//     }

//     const updatedProfile = {
//       ...formData,
//       fullName: formData.fullName.trim(),
//       email: formData.email.trim(),
//     };

//     try {
//       localStorage.setItem(
//         "mypatienthub-profile",
//         JSON.stringify(updatedProfile)
//       );

//       setProfile(updatedProfile);
//       setFormData(updatedProfile);
//       setIsEditing(false);
//       setMessage("Your profile has been saved successfully.");
//     } catch {
//       setMessage("Unable to save your profile in this browser.");
//     }
//   };

//   const handleCancel = () => {
//     setFormData(profile);
//     setIsEditing(false);
//     setMessage("");
//   };

//   const handleEdit = () => {
//     setFormData(profile);
//     setIsEditing(true);
//     setMessage("");
//   };

//   const initials = profile.fullName
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((part) => part[0].toUpperCase())
//     .join("");

//   const renderField = (
//     label,
//     name,
//     type = "text",
//     options = null
//   ) => (
//     <div className="account-field" key={name}>
//       <label htmlFor={name}>{label}</label>

//       {isEditing ? (
//         options ? (
//           <select
//             id={name}
//             name={name}
//             value={formData[name]}
//             onChange={handleChange}
//           >
//             <option value="">Select {label.toLowerCase()}</option>

//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         ) : (
//           <input
//             id={name}
//             name={name}
//             type={type}
//             value={formData[name]}
//             onChange={handleChange}
//             required={name === "fullName" || name === "email"}
//           />
//         )
//       ) : (
//         <p className="account-field-value">
//           {profile[name] || "Not provided"}
//         </p>
//       )}
//     </div>
//   );

  
// return (
//   <div className="account-layout">
//     <Sidebar />

//     <main className="account-main">
//       <Header />

        

//         <div className="account-container">
//           <div className="account-page-heading">
//             <div>
//               <span className="account-eyebrow">
//                 ACCOUNT MANAGEMENT
//               </span>

//               <h1>My Profile</h1>

//               <p>
//                 Manage your personal information and contact details.
//               </p>
//             </div>

//             {!isEditing && (
//               <button
//                 type="button"
//                 className="account-primary-button"
//                 onClick={handleEdit}
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>

//           {message && (
//             <div
//               className="account-message"
//               role="status"
//               aria-live="polite"
//             >
//               {message}
//             </div>
//           )}

//           <section className="profile-summary account-card">
//             <div className="profile-avatar" aria-hidden="true">
//               {initials || "U"}
//             </div>

//             <div className="profile-summary-info">
//               <h2>{profile.fullName || "Your Name"}</h2>
//               <p>{profile.email}</p>
//               <span className="profile-status">
//                 MyPatientHUB Account
//               </span>
//             </div>
//           </section>

//           <form onSubmit={handleSave}>
//             <section className="account-card">
//               <div className="account-section-heading">
//                 <div>
//                   <h2>Personal Information</h2>
//                   <p>Your basic personal details.</p>
//                 </div>
//               </div>

//               <div className="account-fields-grid">
//                 {renderField("Full Name", "fullName")}
//                 {renderField("Email Address", "email", "email")}
//                 {renderField("Phone Number", "phone", "tel")}
//                 {renderField("Date of Birth", "dateOfBirth", "date")}
//                 {renderField("Gender", "gender", "text", [
//                   "Female",
//                   "Male",
//                   "Prefer not to say",
//                 ])}
//                 {renderField("Blood Group", "bloodGroup", "text", [
//                   "A+",
//                   "A-",
//                   "B+",
//                   "B-",
//                   "AB+",
//                   "AB-",
//                   "O+",
//                   "O-",
//                 ])}
//               </div>
//             </section>

//             <section className="account-card">
//               <div className="account-section-heading">
//                 <div>
//                   <h2>Contact Information</h2>
//                   <p>Manage your address and emergency contact.</p>
//                 </div>
//               </div>

//               <div className="account-fields-grid">
//                 {renderField("Address", "address")}
//                 {renderField(
//                   "Emergency Contact",
//                   "emergencyContact",
//                   "tel"
//                 )}
//               </div>
//             </section>

//             {isEditing && (
//               <div className="account-form-actions">
//                 <button
//                   type="button"
//                   className="account-secondary-button"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="account-primary-button"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </form>

//           <div className="account-disclaimer">
//             <strong>Privacy reminder</strong>
//             <p>
//               This demonstration stores profile information in your
//               browser. Do not enter real medical or other sensitive
//               personal information until secure backend storage and
//               appropriate access controls have been implemented.
//             </p>
//           </div>
//         </div>

//         <Footer />
//       </main>
//     </div>
//   );
// }

// export default MyAccount;