import React from 'react';
import './i18n';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import RenterDashboard from './pages/RenterDashboard';
import EquipmentList from './pages/EquipmentList';
import RenteeDashboard from './pages/RenteeDashboard';
import AddEquipment from './pages/AddEquipment';
import BorrowingHistory from './pages/BorrowingHistory';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResourceSelection from './pages/ResourceSelection';
import ResourceSelectionOwner from './pages/ResourceSelectionOwner';
import './App.css';

const App = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userRole');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/equipment-list" element={<EquipmentList />} />
        <Route path="/add-equipment" element={<AddEquipment />} />

        <Route
          path="/renter-dashboard"
          element={
            isLoggedIn && userRole === 'renter' ? (
              <RenterDashboard />
            ) : (
              <Navigate to="/role-selection" />
            )
          }
        />

        <Route path="/ResourceSelection" element={<ResourceSelection />} />
        <Route path="/RenterDashboard" element={<ResourceSelectionOwner />} />
        <Route
          path="/borrowing-history"
          element={
            isLoggedIn && userRole === 'rentee' ? (
              <BorrowingHistory />
            ) : (
              <Navigate to="/role-selection" />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;