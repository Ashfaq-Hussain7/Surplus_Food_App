import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, MapPin, Calendar, Search } from 'lucide-react';
import axios from 'axios';
import '../styles/RecipientDash.css'

const RecipientDashboard = () => {
  const [availableDonations, setAvailableDonations] = useState([]);
  const navigate = useNavigate();
  
  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/recipient/dashboard', {
        headers: {
          'x-auth-token': token, // Add the token in the Authorization header
        },
      });
      console.log(response.data.availableDonations);
      setAvailableDonations(response.data.availableDonations);
    } catch (error) {
      console.error("Error fetching available donations: ", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Modal from 'react-modal';
// import '../styles/RecipientDash.css';

// Modal.setAppElement('#root');

// const RecipientDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newLocation, setNewLocation] = useState('');
//   const navigate = useNavigate(); // Initialize navigate

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleLocationChange = (event) => {
//     setNewLocation(event.target.value);
  };

  const saveLocation = () => {
    console.log("New location saved:", newLocation);
    closeModal();
  };


  // Fetch available donations from the backend
  useEffect(() => {
    fetchDonations();
  }, []);
  // Redirect function
  const handleReserve = (donationId) => {
    navigate(`/reservation`, {state: {donationId}}); // Navigate to /reservation on click
//   // Function to handle reservation navigation
//   const handleReserve = (reservationId) => {
//     navigate(`/reservation/${reservationId}`); // Navigate with reservation ID

  };

  return (
    <div className="recipient-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Your Dashboard</h1>
        </div>
      </div>


        {/* Stats */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div variants={itemVariants}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Available Now</h3>
                <ShoppingBag className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold">{availableDonations.length}</div>
              <p className="text-xs text-gray-500">In your area</p>

//       <div className="dashboard-container">
//         <div className="dashboard-content">
//           <div className="search-section">
//             <div className="search-container">
//               <span className="search-icon" role="img" aria-label="search">🔍</span>
//               <input type="text" placeholder="Search donations..." />

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


        {/* Available Donations List */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xl font-semibold">Nearby Donations</h2>
          {availableDonations.map((donation) => (
            <div key={donation._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-medium">{donation.pickupLocation}</h3>
                <p className="text-sm text-gray-500">{donation.itemDetails}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {donation.foodType}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {donation.quantity} servings
                  </span>
                </div>
              </div>
              <button onClick={() => handleReserve(donation._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//           <div className="donations-list">
//             <h2>Recent Donations</h2>
//             <div className="donation-card">
//               <div className="donation-content">
//                 <h3>Food Donation from ABC Restaurant</h3>
//                 <p className="items-text">Items: Sandwiches, Fruits</p>
//                 <div className="donation-meta">
//                   <span className="meta-icon" role="img" aria-label="location">📍</span>
//                   1234 Food Lane, City
//                 </div>
//               </div>
//               <button className="reserve-button" onClick={() => handleReserve('123')}>
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
