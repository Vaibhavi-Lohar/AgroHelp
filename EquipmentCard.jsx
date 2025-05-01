import React, { useState } from 'react';
import EquipmentDetailsModal from './EquipmentDetailsModal';
import '../App.css';

const EquipmentCard = ({ equipment, onDelete, onBorrow, isRentee }) => {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="equipment-card">
      {/* Equipment Image */}
      {equipment.photo && (
        <img
          src={equipment.photo}
          alt={equipment.name}
          className="equipment-thumbnail"
          onClick={handleImageClick}
        />
      )}

      {/* Equipment Details Modal */}
      {showModal && (
        <EquipmentDetailsModal equipment={equipment} onClose={handleCloseModal} />
      )}

      {/* Delete Button (for Renter) */}
      {!isRentee && (
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
      )}

      {/* Borrow Button (for Rentee) */}
      {isRentee && (
        <button onClick={onBorrow} className="borrow-button">
          Borrow
        </button>
      )}
    </div>
  );
};

export default EquipmentCard;