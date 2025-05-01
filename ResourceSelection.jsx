import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import WorkerSession from './WorkerSession';
import EquipmentSession from './EquipmentSession';
import ComboSession from './ComboSession';
import AllDetails from './AllDetails';
import '../App.css';

const ResourceSelection = () => {
  const navigate = useNavigate();
  const [, setResources] = useState({
    workers: [],
    equipment: [],
    workerEquipmentCombos: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch - in a real app, you would fetch from your backend
    const fetchResources = async () => {
      try {
        // This would be replaced with actual API calls
        // For now, we will leave it empty to fetch data only when uploaded
        setResources({
          workers: [], // No default data
          equipment: [], // No default data
          workerEquipmentCombos: [] // No default data
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleResourceSelect = (resourceType) => {
    localStorage.setItem('selectedResourceType', resourceType);
    
    // Navigate to appropriate page or show the relevant resources
    if (resourceType === 'WORKER') {
      navigate('/workers');
    } else if (resourceType === 'EQUIPMENT') {
      navigate('/equipment');
    } else if (resourceType === 'WORKER_EQUIPMENT') {
      navigate('/worker-equipment-combos');
    }
  };

  if (loading) {
    return <div className="loading">Loading resources...</div>;
  }

  return (
    <Routes>
      <Route path="/workers" element={<WorkerSession />} />
      <Route path="/equipment" element={<EquipmentSession />} />
      <Route path="/worker-equipment-combos" element={<ComboSession />} />
      <Route path="/all-details" element={<AllDetails />} />
      <Route path="/" element={
        <div className="resource-selection">
          <h1>What do you need for your farm?</h1>
          <div className="resource-options">
            <div className="resource-card" onClick={() => handleResourceSelect('WORKER')}>
              <h2>Workers Only</h2>
              <p>Browse skilled farm workers available for hire</p>
            </div>
            <div className="resource-card" onClick={() => handleResourceSelect('EQUIPMENT')}>
              <h2>Equipment Only</h2>
              <p>Find farm equipment available for rent</p>
            </div>
            <div className="resource-card" onClick={() => handleResourceSelect('WORKER_EQUIPMENT')}>
              <h2>Worker + Equipment Combos</h2>
              <p>Get workers with their specialized equipment</p>
            </div>
            <div className="resource-card" onClick={() => navigate('/all-details')}>
              <h2>Show All Details</h2>
              <p>View all workers, equipment, and combos</p>
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default ResourceSelection;