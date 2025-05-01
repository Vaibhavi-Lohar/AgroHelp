import React, { useState } from 'react';
import EquipmentCard from '../components/EquipmentCard';
import { Link } from 'react-router-dom';
import '../App.css';

const RenteeDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const equipmentList = JSON.parse(localStorage.getItem('equipmentList')) || [];
  const selectedCity = localStorage.getItem('selectedCity');

  // Filter equipment based on search query and selected city
  const filteredEquipment = equipmentList.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.price.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = equipment.address.includes(selectedCity);
    return matchesSearch && matchesCity;
  });

  return (
    <div className="rentee-dashboard">
      <h1>Rentee Dashboard</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search equipment by name, description, or price..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>

      {/* Link to Borrowing History */}
      <Link to="/borrowing-history" className="history-link">
        View Borrowing History
      </Link>

      {/* Available Equipment */}
      <div className="available-equipment">
        <h2>Available Equipment in {selectedCity}</h2>
        {filteredEquipment.length > 0 ? (
          <div className="equipment-grid">
            {filteredEquipment.map((equipment, index) => (
              <EquipmentCard
                key={index}
                equipment={equipment}
                isRentee={true}
              />
            ))}
          </div>
        ) : (
          <div className="not-found-message">
            <p>No equipment found. Try something else! 😊</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenteeDashboard;