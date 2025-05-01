import React, { useEffect, useState } from 'react';

const WorkerSession = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/workers');
        if (!res.ok) throw new Error('Failed to fetch workers');
        const data = await res.json();
        setWorkers(data);
      } catch (err) {
        setError(err.message || 'Error fetching workers');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  if (loading) return <div className="loading">Loading workers...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="worker-session-page">
      <h1>Available Workers</h1>
      {workers.length === 0 ? (
        <p>No workers available.</p>
      ) : (
        <div className="worker-list">
          {workers.map((worker, idx) => (
            <div key={worker.id || idx} className="worker-card">
              <h3>{worker.name}</h3>
              <div><strong>Aadhar:</strong> {worker.adhar_no || '-'}</div>
              <div><strong>Daily Rate:</strong> ₹{worker.daily_rate || '-'}</div>
              <div><strong>Specialization:</strong> {worker.specifications || '-'}</div>
              <div><strong>Languages:</strong> {worker.language_known || '-'}</div>
              <div><strong>Experience:</strong> {worker.experience || '-'}</div>
              <div><strong>Status:</strong> {worker.status || '-'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkerSession;
