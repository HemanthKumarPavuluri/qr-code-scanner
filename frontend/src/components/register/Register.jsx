import React, { useState } from 'react';
import './register.css'; // Import the CSS file
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('tab2');

//   const handleTabClick = (value) => {
//     setActiveTab(value);
//   };
const handleloginfunction = (values) => {
    navigate(`/`);
  };

  return (
    <div className="container">
      <div className="content">
      <h2>Welcome to QR Attendance System</h2>
          <div className="register">
            <h2>Sign up with:</h2>
            <div className="social-icons">
              <button className="social-btn facebook">F</button>
              <button className="social-btn twitter">T</button>
              <button className="social-btn google">G</button>
              <button className="social-btn github">GH</button>
            </div>
            <p>or:</p>
            <input type="text" placeholder="Name" className="input" />
            <input type="text" placeholder="Username" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <div className="terms">
              <label>
                <input type="checkbox" /> I have read and agree to the terms
              </label>
            </div>
            <h4>Already have Account</h4>
            <button className="btn" onClick={handleloginfunction}>Login</button>

          </div>
        
      </div>
    </div>
  );
}

export default Register;
