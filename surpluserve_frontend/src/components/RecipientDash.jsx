import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/RecipientDash.css';

Modal.setAppElement('#root');

const RecipientDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLocationChange = (event) => {
    setNewLocation(event.target.value);
  };

  const saveLocation = () => {
    console.log("New location saved:", newLocation);
    closeModal();
  };

  // Function to handle reservation navigation
  const handleReserve = (reservationId) => {
    navigate(`/reservation/${reservationId}`); // Navigate with reservation ID
  };

  return (
    <div className="recipient-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Your Dashboard</h1>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="search-section">
            <div className="search-container">
              <span className="search-icon" role="img" aria-label="search">🔍</span>
              <input type="text" placeholder="Search donations..." />
            </div>
            <button className="location-button" onClick={openModal}>
              <span className="location-icon" role="img" aria-label="location">📍</span>
              Change Location
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-header">
                <h3>Donations</h3>
                <span className="stat-icon" role="img" aria-label="donations">📦</span>
              </div>
              <p className="stat-value">150</p>
              <p className="stat-subtitle">Total Donations</p>
            </div>
          </div>

          <div className="donations-list">
            <h2>Recent Donations</h2>
            <div className="donation-card">
              <div className="donation-content">
                <h3>Food Donation from ABC Restaurant</h3>
                <p className="items-text">Items: Sandwiches, Fruits</p>
                <div className="donation-meta">
                  <span className="meta-icon" role="img" aria-label="location">📍</span>
                  1234 Food Lane, City
                </div>
              </div>
              <button className="reserve-button" onClick={() => handleReserve('123')}>
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Location Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Change Location"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Change Your Location</h2>
        <input
          type="text"
          value={newLocation}
          onChange={handleLocationChange}
          placeholder="Enter new location"
          className="location-input"
        />
        <button onClick={saveLocation} className="save-button">Save</button>
        <button onClick={closeModal} className="cancel-button">Cancel</button>
      </Modal>
    </div>
  );
};

export default RecipientDashboard;
