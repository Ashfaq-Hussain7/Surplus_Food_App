import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, MapPin, Calendar, Search } from 'lucide-react';
import '../styles/RecipientDash.css'

const RecipientDashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const availableDonations = [
    {
      id: 1,
      donor: "Fresh Foods Market",
      items: "Fresh vegetables, bread",
      distance: "0.8 km",
      pickup: "Today, 5-6 PM"
    },
    {
      id: 2,
      donor: "Local Bakery",
      items: "Assorted pastries",
      distance: "1.2 km",
      pickup: "Tomorrow, 9-10 AM"
    },
    {
      id: 3,
      donor: "Green Grocers",
      items: "Mixed fruits, dairy",
      distance: "2.1 km",
      pickup: "Today, 7-8 PM"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900"
          >
            Available Donations
          </motion.h1>
          <motion.div 
            variants={itemVariants}
            className="flex space-x-2"
          >
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search donations..." 
                className="pl-8 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <button className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
              <MapPin className="h-4 w-4 mr-2" />
              Change Location
            </button>
          </motion.div>
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
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">In your area</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Next Available Pickup</h3>
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold">30m</div>
              <p className="text-xs text-gray-500">Within 2km radius</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Scheduled Pickups</h3>
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500">For this week</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Available Donations List */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xl font-semibold">Nearby Donations</h2>
          {availableDonations.map((donation) => (
            <div key={donation.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-medium">{donation.donor}</h3>
                <p className="text-sm text-gray-500">{donation.items}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {donation.distance}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {donation.pickup}
                  </span>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Reserve
              </button>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RecipientDashboard;