import React from 'react';
import EquipmentCard from '../components/EquipmentCard';
import { Link } from 'react-router-dom';
import '../App.css';

const BorrowingHistory = () => {
  const borrowedHistory = JSON.parse(localStorage.getItem('borrowedHistory')) || [];

  return (
    <div className="borrowing-history-page">
      <h1>Borrowing History</h1>
      <Link to="/rentee-dashboard" className="back-button">
        Back to Rentee Dashboard
      </Link>
      {borrowedHistory.length > 0 ? (
        <div className="equipment-grid">
          {borrowedHistory.map((equipment, index) => (
            <EquipmentCard
              key={index}
              equipment={equipment}
              isRentee={true}
            />
          ))}
        </div>
      ) : (
        <p>No equipment borrowed yet.</p>
      )}
    </div>
  );
};

export default BorrowingHistory;