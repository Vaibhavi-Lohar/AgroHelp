import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Image URLs for equipment categories
const equipmentImages = {
  tractor: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg',
  harvester: 'https://images.pexels.com/photos/5731894/pexels-photo-5731894.jpeg',
  irrigation: 'https://images.pexels.com/photos/4947386/pexels-photo-4947386.jpeg',
  seeder: 'https://images.pexels.com/photos/2519484/pexels-photo-2519484.jpeg',
  sprayer: 'https://images.pexels.com/photos/4947091/pexels-photo-4947091.jpeg'
};

const ResourceSelectionOwner = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const goBack = () => {
    navigate('/');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [newWorker, setNewWorker] = useState({ 
    name: '', 
    skills: [], 
    contact: '', 
    experience: '', 
    availability: '', 
    address: '',
    aadhar: '',
    rate: '',
    languages: [],
    specialization: '',
    owner: '' 
  });
  const [newEquipment, setNewEquipment] = useState({ 
    name: '', 
    type: '', 
    manufacturer: '', 
    model: '',
    year: '',
    condition: '', 
    rentalPrice: '', 
    availability: '',
    description: '',
    specifications: '',
    insuranceDetails: '',
    owner: '' 
  });

  // Simulated state to hold resources (in a real app, this would be managed globally)
  const [resources, setResources] = useState({
    workers: [
      { id: 1, name: 'John Doe', specialization: 'Tractor Operation', status: 'available' },
      { id: 2, name: 'Jane Smith', specialization: 'Harvesting', status: 'busy' }
    ],
    equipment: [
      { id: 1, name: 'Tractor Model X', type: 'tractor', status: 'available' },
      { id: 2, name: 'Harvester Pro', type: 'harvester', status: 'maintenance' }
    ]
  });

  // State for calendar events
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, title: 'Tractor Maintenance', start: '2025-04-20', end: '2025-04-21', type: 'maintenance' },
    { id: 2, title: 'Harvester Rental', start: '2025-04-18', end: '2025-04-19', type: 'rental' },
    { id: 3, title: 'Worker Assignment', start: '2025-04-19', type: 'worker' }
  ]);

  // State for maintenance records
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    { id: 1, equipmentId: 1, date: '2025-03-15', type: 'Routine', cost: 5000, description: 'Oil change and filter replacement' },
    { id: 2, equipmentId: 2, date: '2025-03-20', type: 'Repair', cost: 15000, description: 'Hydraulic system repair' }
  ]);

  // State for revenue data
  const [revenueData, setRevenueData] = useState({
    monthly: [
      { month: 'Jan', amount: 45000 },
      { month: 'Feb', amount: 52000 },
      { month: 'Mar', amount: 61000 },
      { month: 'Apr', amount: 58000 }
    ],
    byCategory: {
      tractor: 120000,
      harvester: 85000,
      irrigation: 45000
    }
  });

  // State for worker performance
  const [workerPerformance, setWorkerPerformance] = useState([
    { workerId: 1, completedTasks: 45, rating: 4.8, earnings: 35000 },
    { workerId: 2, completedTasks: 38, rating: 4.5, earnings: 30000 }
  ]);

  // State for resource availability
  const [resourceAvailability, setResourceAvailability] = useState({
    workers: [
      { id: 1, availableDates: ['2025-04-18', '2025-04-19', '2025-04-20'] },
      { id: 2, availableDates: ['2025-04-19', '2025-04-21', '2025-04-22'] }
    ],
    equipment: [
      { id: 1, availableDates: ['2025-04-20', '2025-04-21', '2025-04-22'] },
      { id: 2, availableDates: ['2025-04-18', '2025-04-19', '2025-04-23'] }
    ]
  });

  const [analytics, setAnalytics] = useState({
    totalEarnings: 25000,
    activeRentals: 3,
    pendingRequests: 2,
    completedRentals: 15
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'request', message: 'New rental request for Tractor Model X', time: '2 hours ago' },
    { id: 2, type: 'return', message: 'Equipment return scheduled for Harvester Pro', time: '1 day ago' },
    { id: 3, type: 'payment', message: 'Payment received for last week\'s rentals', time: '2 days ago' }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching resources from the backend
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddWorker = async (e) => {
    e.preventDefault();
    try {
      // Prepare the worker data for backend
      const workerData = {
        name: newWorker.name,
        adhar_no: newWorker.aadhar || newWorker.adhar || '',
        daily_rate: newWorker.rate || '',
        specifications: newWorker.specialization || '',
        language_known: (newWorker.languages || []).join(', '),
        experience: newWorker.experience || '',
        provider_id: newWorker.owner || '', // You may need to set the correct provider id
      };
      const response = await fetch('http://localhost:5000/api/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workerData)
      });
      if (!response.ok) {
        const errData = await response.json();
        alert('Failed to add worker: ' + (errData.error || 'Unknown error'));
        return;
      }
      const savedWorker = await response.json();
      const updatedWorkers = [...resources.workers, savedWorker];
      setResources({ ...resources, workers: updatedWorkers });
      setNewWorker({ name: '', skills: [], contact: '', experience: '', availability: '', address: '', aadhar: '', rate: '', languages: [], specialization: '', owner: '' });
      setShowAddWorker(false);
    } catch (error) {
      alert('Error adding worker: ' + error.message);
    }
  };


  const handleAddEquipment = (e) => {
    e.preventDefault();
    const updatedEquipment = [...resources.equipment, { ...newEquipment, owner: 'Owner Name' }]; // Replace 'Owner Name' with actual owner's name
    setResources({ ...resources, equipment: updatedEquipment });
    console.log('Adding equipment:', newEquipment);
    setNewEquipment({ name: '', type: '', manufacturer: '', condition: '', rentalPrice: '', owner: '' });
    setShowAddEquipment(false);
  };

  if (loading) {
    return <div className="loading">Loading resources...</div>;
  }

  // Filter resources based on search and type
  const filteredResources = {
    workers: resources.workers.filter(worker =>
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterType === 'all' || filterType === 'workers')
    ),
    equipment: resources.equipment.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterType === 'all' || filterType === 'equipment')
    )
  };

  // Handle notification actions
  const handleNotificationAction = (id, action) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    // Add logic for handling different notification actions
  };

  const handleWorkerSubmit = (e) => {
    e.preventDefault();
    // Add worker submission logic here
    setShowAddWorker(false);
  };

  const handleEquipmentSubmit = (e) => {
    e.preventDefault();
    // Add equipment submission logic here
    setShowAddEquipment(false);
  };

  // Show ONLY Add Worker form if showAddWorker is true
  if (showAddWorker) {
    return (
      <div className="resource-selection">
        <div className="modal">
          <form onSubmit={handleWorkerSubmit} className="resource-form">
            <h2>Add Worker</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Aadhar Number</label>
                <input
                  type="text"
                  value={newWorker.aadhar}
                  onChange={(e) => setNewWorker({ ...newWorker, aadhar: e.target.value })}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="form-group">
                <label>Daily Rate (₹)</label>
                <input
                  type="number"
                  value={newWorker.rate}
                  onChange={(e) => setNewWorker({ ...newWorker, rate: e.target.value })}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <select
                  value={newWorker.specialization}
                  onChange={(e) => setNewWorker({ ...newWorker, specialization: e.target.value })}
                  required
                >
                  <option value="">Select specialization</option>
                  <option value="tractor">Tractor Operation</option>
                  <option value="harvester">Harvesting</option>
                  <option value="irrigation">Irrigation</option>
                </select>
              </div>
              <div className="form-group">
                <label>Languages Known</label>
                <input
                  type="text"
                  value={newWorker.languages.join(', ')}
                  onChange={(e) => setNewWorker({ ...newWorker, languages: e.target.value.split(',').map((l) => l.trim()) })}
                  placeholder="e.g., Hindi, English, Marathi"
                />
              </div>
              <div className="form-group">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  value={newWorker.experience}
                  onChange={(e) => setNewWorker({ ...newWorker, experience: e.target.value })}
                  min="0"
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Upload Photo</label>
                <div className="file-input">
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                {previewUrl && (
                  <div className="image-preview">
                    <img src={previewUrl} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                Add Worker
              </button>
              <button type="button" className="cancel-button" onClick={() => setShowAddWorker(false)}>
                Cancel
              </button>
            </div>
            {/* Show all worker details below the form */}
            <div className="worker-list">
              <h3>All Workers</h3>
              <ul>
                {resources.workers.map((worker, idx) => (
                  <li key={worker.id || idx} style={{marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px'}}>
                    <strong>Name:</strong> {worker.name} <br/>
                    <strong>Aadhar:</strong> {worker.adhar_no || worker.aadhar || '-'} <br/>
                    <strong>Daily Rate:</strong> {worker.daily_rate || worker.rate || '-'} <br/>
                    <strong>Specialization:</strong> {worker.specialization || worker.specifications || '-'} <br/>
                    <strong>Languages:</strong> {worker.language_known || (worker.languages ? worker.languages.join(', ') : '-')} <br/>
                    <strong>Experience:</strong> {worker.experience || '-'}
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Show ONLY Add Equipment form if showAddEquipment is true
  if (showAddEquipment) {
    return (
      <div className="resource-selection">
        <div className="modal">
          <form onSubmit={handleEquipmentSubmit} className="resource-form">
            <h2>Add Equipment</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Equipment Name</label>
                <input
                  type="text"
                  value={newEquipment.name}
                  onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  value={newEquipment.type}
                  onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Manufacturer</label>
                <input
                  type="text"
                  value={newEquipment.manufacturer}
                  onChange={(e) => setNewEquipment({ ...newEquipment, manufacturer: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  value={newEquipment.model}
                  onChange={(e) => setNewEquipment({ ...newEquipment, model: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  value={newEquipment.year}
                  onChange={(e) => setNewEquipment({ ...newEquipment, year: e.target.value })}
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
              <div className="form-group">
                <label>Condition</label>
                <input
                  type="text"
                  value={newEquipment.condition}
                  onChange={(e) => setNewEquipment({ ...newEquipment, condition: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rental Price (₹)</label>
                <input
                  type="number"
                  value={newEquipment.rentalPrice}
                  onChange={(e) => setNewEquipment({ ...newEquipment, rentalPrice: e.target.value })}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Availability</label>
                <input
                  type="text"
                  value={newEquipment.availability}
                  onChange={(e) => setNewEquipment({ ...newEquipment, availability: e.target.value })}
                  placeholder="e.g., Available, In Use, Under Maintenance"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newEquipment.description}
                  onChange={(e) => setNewEquipment({ ...newEquipment, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Specifications</label>
                <textarea
                  value={newEquipment.specifications}
                  onChange={(e) => setNewEquipment({ ...newEquipment, specifications: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Insurance Details</label>
                <input
                  type="text"
                  value={newEquipment.insuranceDetails}
                  onChange={(e) => setNewEquipment({ ...newEquipment, insuranceDetails: e.target.value })}
                />
              </div>
              <div className="form-group full-width">
                <label>Upload Photo</label>
                <div className="file-input">
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                {previewUrl && (
                  <div className="image-preview">
                    <img src={previewUrl} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                Add Equipment
              </button>
              <button type="button" className="cancel-button" onClick={() => setShowAddEquipment(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="resource-selection">
      <nav className="dashboard-nav">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-tab ${activeTab === 'workers' ? 'active' : ''}`}
            onClick={() => setActiveTab('workers')}
          >
            Workers
          </button>
          <button
            className={`nav-tab ${activeTab === 'equipment' ? 'active' : ''}`}
            onClick={() => setActiveTab('equipment')}
          >
            Equipment
          </button>

        </div>
        <div className="nav-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All</option>
              <option value="workers">Workers</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
          <div className="notifications-dropdown">
            <button className="notifications-toggle">
              Notifications
              <span className="notification-badge">{notifications.length}</span>
            </button>
            <div className="notifications-menu">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification-item ${notification.type}`}>
                  <p>{notification.message}</p>
                  <span>{notification.time}</span>
                  <div className="notification-actions">
                    <button onClick={() => handleNotificationAction(notification.id, 'view')}>View</button>
                    <button onClick={() => handleNotificationAction(notification.id, 'dismiss')}>Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
        {activeTab === 'dashboard' && (
          <div className="dashboard-header">
            <h2>Welcome to KrishiSeva Owner Dashboard</h2>
            <p>Manage your agricultural resources and worker listings efficiently</p>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Equipment Listed</h3>
                <p>{resources.equipment.length}</p>
              </div>
              <div className="stat-card">
                <h3>Workers Registered</h3>
                <p>{resources.workers.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Earnings</h3>
                <p>₹{analytics.totalEarnings}</p>
              </div>
              <div className="stat-card">
                <h3>Active Rentals</h3>
                <p>{analytics.activeRentals}</p>
              </div>
            </div>
            {/* Worker Selection Dropdown/List */}
            <div className="dashboard-worker-list" style={{ margin: '24px 0' }}>
              <label htmlFor="workerDropdown"><strong>Select Worker:</strong></label>
              <select id="workerDropdown" style={{ marginLeft: 8, minWidth: 180 }}>
                <option value="">-- Select a worker --</option>
                {resources.workers.map((worker, idx) => (
                  <option key={worker.id || idx} value={worker.id || idx}>
                    {worker.name} ({worker.specialization || worker.specifications || '-'})
                  </option>
                ))}
              </select>
            </div>
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button onClick={() => setShowAddWorker(true)}>
                  <span className="icon">👥</span>
                  Add Worker
                </button>
                <button onClick={() => setShowAddEquipment(true)}>
                  <span className="icon">🚜</span>
                  Add Equipment
                </button>
                <button onClick={() => navigate('/rental-requests')}>
                  <span className="icon">📋</span>
                  View Requests
                </button>
              </div>
            </div>
          </div>
        )}

      {activeTab === 'analytics' && (
        <div className="analytics-section">
          <div className="analytics-header">
            <h2>Performance Analytics</h2>
            <div className="date-filter">
              <select defaultValue="month">
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          <div className="analytics-grid">
            <div className="analytics-card revenue">
              <h3>Revenue Overview</h3>
              <div className="chart-container">
                <div className="chart-placeholder">Monthly Revenue Chart</div>
                <div className="chart-legend">
                  {Object.entries(revenueData.byCategory).map(([category, amount]) => (
                    <div key={category} className="legend-item">
                      <span className={`legend-color ${category}`}></span>
                      <span className="legend-label">{category}</span>
                      <span className="legend-value">₹{amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="analytics-stats">
                <div>
                  <h4>Total Revenue</h4>
                  <p>₹{analytics.totalEarnings.toLocaleString()}</p>
                  <span className="trend positive">↑ 12% vs last month</span>
                </div>
                <div>
                  <h4>Average Daily Revenue</h4>
                  <p>₹{(analytics.totalEarnings / 30).toFixed(0).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="analytics-card utilization">
              <h3>Resource Utilization</h3>
              <div className="utilization-grid">
                <div className="utilization-item">
                  <h4>Equipment Utilization</h4>
                  <div className="progress-circle" data-progress="75">
                    <span className="progress-text">75%</span>
                  </div>
                  <p>15 out of 20 items in use</p>
                </div>
                <div className="utilization-item">
                  <h4>Worker Engagement</h4>
                  <div className="progress-circle" data-progress="85">
                    <span className="progress-text">85%</span>
                  </div>
                  <p>17 out of 20 workers assigned</p>
                </div>
              </div>
            </div>

            <div className="analytics-card maintenance">
              <h3>Maintenance Overview</h3>
              <div className="maintenance-stats">
                <div className="maintenance-item">
                  <span className="maintenance-icon">🔧</span>
                  <div>
                    <h4>Scheduled Maintenance</h4>
                    <p>{maintenanceRecords.filter(r => r.type === 'Routine').length} upcoming</p>
                  </div>
                </div>
                <div className="maintenance-item">
                  <span className="maintenance-icon">⚠️</span>
                  <div>
                    <h4>Repairs Needed</h4>
                    <p>{maintenanceRecords.filter(r => r.type === 'Repair').length} pending</p>
                  </div>
                </div>
              </div>
              <div className="maintenance-timeline">
                {maintenanceRecords.slice(0, 3).map(record => (
                  <div key={record.id} className="timeline-item">
                    <div className="timeline-date">{new Date(record.date).toLocaleDateString()}</div>
                    <div className="timeline-content">
                      <h5>{record.type}</h5>
                      <p>{record.description}</p>
                      <span className="timeline-cost">₹{record.cost.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="analytics-card performance">
              <h3>Worker Performance</h3>
              <div className="performance-grid">
                {workerPerformance.map(worker => {
                  const workerInfo = resources.workers.find(w => w.id === worker.workerId);
                  return (
                    <div key={worker.workerId} className="performance-card">
                      <div className="performance-header">
                        <h4>{workerInfo?.name || `Worker ${worker.workerId}`}</h4>
                        <span className={`rating rating-${Math.floor(worker.rating)}`}>
                          {worker.rating.toFixed(1)} ★
                        </span>
                      </div>
                      <div className="performance-stats">
                        <div>
                          <span>Tasks Completed</span>
                          <strong>{worker.completedTasks}</strong>
                        </div>
                        <div>
                          <span>Earnings</span>
                          <strong>₹{worker.earnings.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="calendar-section">
            <h3>Schedule Overview</h3>
            <div className="calendar-grid">
              <div className="calendar-controls">
                <button className="calendar-nav">←</button>
                <h4>April 2025</h4>
                <button className="calendar-nav">→</button>
              </div>
              <div className="calendar-events">
                {calendarEvents.map(event => (
                  <div key={event.id} className={`calendar-event ${event.type}`}>
                    <span className="event-date">{new Date(event.start).toLocaleDateString()}</span>
                    <h5>{event.title}</h5>
                    {event.end && (
                      <span className="event-duration">
                        {Math.ceil((new Date(event.end) - new Date(event.start)) / (1000 * 60 * 60 * 24))} days
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="resource-options">
          <div className="option-card" onClick={() => { setShowAddWorker(true); setShowAddEquipment(false); }}>
            <div className="card-badge">Workers</div>
            <img src="https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg" alt="Add Worker" />
            <div className="card-content">
              <h3>Add Worker</h3>
              <p>Register new agricultural workers and manage their profiles</p>
              <ul className="card-features">
                <li>✓ Complete worker profiles</li>
                <li>✓ Skill tracking</li>
                <li>✓ Availability management</li>
              </ul>
            </div>
          </div>
          <div className="option-card" onClick={() => { setShowAddEquipment(true); setShowAddWorker(false); }}>
            <div className="card-badge">Equipment</div>
            <img src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg" alt="Add Equipment" />
            <div className="card-content">
              <h3>Add Equipment</h3>
              <p>List and manage your farming equipment inventory</p>
              <ul className="card-features">
                <li>✓ Detailed specifications</li>
                <li>✓ Rental pricing</li>
                <li>✓ Availability tracking</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {showAddWorker && (
        <div className="modal">
          <form onSubmit={handleWorkerSubmit} className="resource-form">
            <h2>Add Worker</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Aadhar Number</label>
                <input
                  type="text"
                  value={newWorker.aadhar}
                  onChange={(e) => setNewWorker({ ...newWorker, aadhar: e.target.value })}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="form-group">
                <label>Daily Rate (₹)</label>
                <input
                  type="number"
                  value={newWorker.rate}
                  onChange={(e) => setNewWorker({ ...newWorker, rate: e.target.value })}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <select
                  value={newWorker.specialization}
                  onChange={(e) => setNewWorker({ ...newWorker, specialization: e.target.value })}
                  required
                >
                  <option value="">Select specialization</option>
                  <option value="tractor">Tractor Operation</option>
                  <option value="harvester">Harvesting</option>
                  <option value="irrigation">Irrigation</option>
                </select>
              </div>
              <div className="form-group">
                <label>Languages Known</label>
                <input
                  type="text"
                  value={newWorker.languages.join(', ')}
                  onChange={(e) => setNewWorker({ ...newWorker, languages: e.target.value.split(',').map((l) => l.trim()) })}
                  placeholder="e.g., Hindi, English, Marathi"
                />
              </div>
              <div className="form-group">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  value={newWorker.experience}
                  onChange={(e) => setNewWorker({ ...newWorker, experience: e.target.value })}
                  min="0"
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Upload Photo</label>
                <div className="file-input">
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                {previewUrl && (
                  <div className="image-preview">
                    <img src={previewUrl} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                Add Worker
              </button>
              <button type="button" className="cancel-button" onClick={() => setShowAddWorker(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showAddEquipment && (
        <div className="modal">
          <form onSubmit={handleEquipmentSubmit} className="resource-form">
            <h2>Add Equipment</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Equipment Name</label>
                <input
                  type="text"
                  value={newEquipment.name}
                  onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newEquipment.type}
                  onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
                  required
                >
                  <option value="">Select type</option>
                  <option value="tractor">Tractor</option>
                  <option value="harvester">Harvester</option>
                  <option value="irrigation">Irrigation System</option>
                </select>
              </div>
              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  value={newEquipment.model}
                  onChange={(e) => setNewEquipment({ ...newEquipment, model: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  value={newEquipment.year}
                  onChange={(e) => setNewEquipment({ ...newEquipment, year: e.target.value })}
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
              <div className="form-group">
                <label>Condition</label>
                <select
                  value={newEquipment.condition}
                  onChange={(e) => setNewEquipment({ ...newEquipment, condition: e.target.value })}
                  required
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
              <div className="form-group">
                <label>Daily Rate (₹)</label>
                <input
                  type="number"
                  value={newEquipment.rentalPrice}
                  onChange={(e) => setNewEquipment({ ...newEquipment, rentalPrice: e.target.value })}
                  min="0"
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={newEquipment.description}
                  onChange={(e) => setNewEquipment({ ...newEquipment, description: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="form-group full-width">
                <label>Specifications</label>
                <textarea
                  value={newEquipment.specifications}
                  onChange={(e) => setNewEquipment({ ...newEquipment, specifications: e.target.value })}
                  placeholder="Enter key specifications, one per line"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Insurance Valid Until</label>
                <input
                  type="date"
                  value={newEquipment.insuranceDetails}
                  onChange={(e) => setNewEquipment({ ...newEquipment, insuranceDetails: e.target.value })}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Upload Photos</label>
                <div className="file-input">
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                </div>
                {previewUrl && (
                  <div className="image-preview">
                    <img src={previewUrl} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-button">Add Equipment</button>
              <button type="button" className="cancel-button" onClick={() => setShowAddEquipment(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResourceSelectionOwner;