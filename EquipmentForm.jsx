import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EquipmentForm = ({ onAddEquipment }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const equipment = {
        name,
        description,
        address,
        ownerName,
        mobileNo,
        price,
        photo
      };
      await onAddEquipment(equipment);
      // Clear form fields
      setName('');
      setDescription('');
      setAddress('');
      setOwnerName('');
      setMobileNo('');
      setPrice('');
      setPhoto(null);
      navigate('/equipment-list');
    } catch (err) {
      setError(err.message || 'Error adding equipment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="equipment-form">
      <h2>{t('Upload Equipment Details')}</h2>
      <div className="form-group">
        <label>{t('Equipment Name:')}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>{t('Description:')}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>{t('Address:')}</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>{t('Owner Name:')}</label>
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>{t('Mobile Number:')}</label>
        <input
          type="text"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>{t('Price:')}</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>{t('Upload Photo:')}</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </div>
      <button type="submit" className="submit-button">{t('Submit')}</button>
    </form>
    
    
  );
};

export default EquipmentForm;