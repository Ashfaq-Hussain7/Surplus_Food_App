import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Package, TrendingUp, Users, Plus } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import NewDonation from './NewDonation';
import '../styles/DonorDash.css';

const DonorDashboard = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationData, setDonationData] = useState([
    { month: 'Jan', donations: 4 },
    { month: 'Feb', donations: 7 },
    { month: 'Mar', donations: 5 },
    { month: 'Apr', donations: 8 },
    { month: 'May', donations: 12 },
    { month: 'Jun', donations: 9 },
  ]);

  const handleNewDonation = (formData) => {
    // Here you would typically make an API call to save the donation
    // For now, we'll just update the local state
    const currentMonth = new Date().toLocaleString('default', { month: 'short' });
    const updatedData = [...donationData];
    const currentMonthData = updatedData.find(d => d.month === currentMonth);
    
    if (currentMonthData) {
      currentMonthData.donations += 1;
    } else {
      updatedData.push({ month: currentMonth, donations: 1 });
    }
    
    setDonationData(updatedData);
    setShowDonationForm(false);
  };

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900"
          >
            Donor Dashboard
          </motion.h1>
          <motion.div variants={itemVariants}>
            <button 
              onClick={() => setShowDonationForm(true)}
              className="bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white py-2 px-4 rounded-md flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>New Donation</span>
            </button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div variants={itemVariants}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Total Donations</h3>
                <Package className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-gray-500">+20.1% from last month</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Recipients Helped</h3>
                <Users className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-gray-500">+12 new this month</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Food Saved (kg)</h3>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold">250</div>
              <p className="text-xs text-gray-500">+43kg this week</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Next Pickup</h3>
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold">2d 4h</div>
              <p className="text-xs text-gray-500">Thursday, 2:30 PM</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Chart */}
        <motion.div variants={itemVariants}>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-sm font-medium">Donation History</h3>
            <p className="text-xs text-gray-500">Your impact over time</p>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="donations" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* New Donation Form */}
      <AnimatePresence>
        {showDonationForm && (
          <NewDonation 
            onClose={() => setShowDonationForm(false)} 
            onSubmit={handleNewDonation}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonorDashboard;