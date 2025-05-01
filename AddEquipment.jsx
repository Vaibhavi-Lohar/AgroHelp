import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AddEquipment = () => {
  const [equipment, setEquipment] = useState({
    name: '',
    type: '',
    description: '',
    image: ''
  });
  const [equipmentList, setEquipmentList] = useState(
    JSON.parse(localStorage.getItem('equipmentList')) || []
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipment({ ...equipment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = [...equipmentList, equipment];
    setEquipmentList(updatedList);
    localStorage.setItem('equipmentList', JSON.stringify(updatedList));
    setEquipment({ name: '', type: '', description: '', image: '' });
    alert('Equipment added successfully!');
  };

  return (
    <div className="add-equipment-page">
      <div className="auth-form enhanced-auth-form">
        <h2>Add New Equipment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={equipment.name}
              onChange={handleChange}
              required
              placeholder="e.g., Tractor"
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <input
              type="text"
              name="type"
              value={equipment.type}
              onChange={handleChange}
              required
              placeholder="e.g., Harvester"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={equipment.description}
              onChange={handleChange}
              required
              placeholder="Describe the equipment"
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={equipment.image}
              onChange={handleChange}
              placeholder="Paste image URL (optional)"
            />
          </div>
          <button type="submit" className="submit-button enhanced-btn">Add Equipment</button>
        </form>
        <button onClick={() => navigate('/renter-dashboard')} className="enhanced-btn" style={{marginTop: '10px'}}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default AddEquipment;
