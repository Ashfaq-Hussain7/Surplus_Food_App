import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Calendar, Clock, ArrowLeft } from 'lucide-react';
import '../styles/NewDonation.css';

const NewDonation = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expiryDate: '',
    pickupAddress: '',
    pickupDate: '',
    pickupTime: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    onClose();
  };

  const containerVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    },
    exit: {
      opacity: 0,
      x: '100%'
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="new-donation-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="form-header">
        <button onClick={onClose} className="back-button">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2>New Donation</h2>
      </div>

      <motion.div
        className="progress-bar"
        initial={{ width: '33.33%' }}
        animate={{ width: `${(step / 3) * 100}%` }}
        transition={{ duration: 0.3 }}
      />

      <motion.form
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="donation-form"
      >
        {step === 1 && (
          <motion.div className="form-step" variants={itemVariants}>
            <div className="form-group">
              <label>
                <Package className="icon" />
                Food Type
              </label>
              <input
                type="text"
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                placeholder="e.g., Fresh Produce, Canned Goods"
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity (kg)</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter approximate weight"
                required
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div className="form-step" variants={itemVariants}>
            <div className="form-group">
              <label>
                <MapPin className="icon" />
                Pickup Address
              </label>
              <input
                type="text"
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                placeholder="Enter pickup location"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Calendar className="icon" />
                Pickup Date
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Clock className="icon" />
                Preferred Time
              </label>
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div className="form-step" variants={itemVariants}>
            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions or details?"
                rows={4}
              />
            </div>

            <div className="donation-summary">
              <h3>Donation Summary</h3>
              <p><strong>Food Type:</strong> {formData.foodType}</p>
              <p><strong>Quantity:</strong> {formData.quantity}kg</p>
              <p><strong>Pickup:</strong> {formData.pickupDate} at {formData.pickupTime}</p>
            </div>
          </motion.div>
        )}

        <div className="form-navigation">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="secondary-button"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="primary-button"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="primary-button">
              Submit Donation
            </button>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
};

export default NewDonation;