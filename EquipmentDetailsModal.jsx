import React from 'react';
import '../App.css';

const EquipmentDetailsModal = ({ equipment, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{equipment.name}</h2>
        {equipment.photo && (
          <img src={equipment.photo} alt={equipment.name} className="modal-image" />
        )}
        <p>{equipment.description}</p>
        <p>Address: {equipment.address}</p>
        <p>Owner: {equipment.ownerName}</p>
        <p>Mobile: {equipment.mobileNo}</p>
        <p>Price: {equipment.price}</p>
      </div>
    </div>
  );
};

export default EquipmentDetailsModal;