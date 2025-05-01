import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem('userRole', role); // Store the selected role
    if (role === 'FARMER') {
      navigate('/RenterDashboard');
    } else if (role === 'BUYER') {
      navigate('/ResourceSelection'); // Redirect to ResourceSelection
    }
  };

  return (
    <div className="role-selection-page login-bg">
      <div className="role-selection-card">
        <div className="auth-logo">
          <h2>KrishiSeva.in</h2>
        </div>
        <h1>Choose Your Role</h1>
        <p className="role-selection-subtitle">Select your role to continue</p>
        <div className="role-buttons">
          <button className="role-btn" onClick={() => handleRoleSelect('FARMER')}>
            <span>PROVIDER</span>
          </button>
          <button className="role-btn" onClick={() => handleRoleSelect('BUYER')}>
            <span>BUYER</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;