
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { MapPin, Clock, ShoppingBag, Check } from 'lucide-react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const ReservationPage = () => {
//   const [donation, setDonation] = useState(null);
//   const [receipt, setReceipt] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
  
//   const location = useLocation();
//   const navigate = useNavigate();
//   const donationId = location.state?.donationId;

//   useEffect(() => {
//     if (!donationId) {
//       navigate('/dashboard');
//       return;
//     }
//     // Fetch donation details when component mounts
//     fetchDonationDetails();
//   }, [donationId, navigate]);

//   const fetchDonationDetails = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`/api/recipient/dashboard/${donationId}`, {
//         headers: {
//           'x-auth-token': token
//         }
//       });
//       setDonation(response.data);
//     } catch (error) {
//       setError('Failed to fetch donation details');
//       console.error('Error fetching donation:', error);
//     }
//   };

//   const handleClaim = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(`/api/recipient/claim/${donationId}`, {}, {
//         headers: {
//           'x-auth-token': token
//         }
//       });

//       setReceipt(response.data.receipt);
//       setSuccess(true);
//       setLoading(false);

//       // Generate PDF receipt
//       generatePDF();
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to claim donation');
//       setLoading(false);
//     }
//   };

//   const generatePDF = async () => {
//     const doc = new jsPDF();
//     const receiptElement = document.getElementById('receipt-details');

//     if (receiptElement) {
//       const canvas = await html2canvas(receiptElement);
//       const imgData = canvas.toDataURL('image/png');
//       const imgWidth = 190;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
//       doc.save('receipt.pdf');
//     }
//   };

//   if (success && receipt) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold flex items-center gap-2">
//                 <Check className="text-green-500" />
//                 Donation Claimed Successfully
//               </h2>
//               <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
//                 Confirmed
//               </span>
//             </div>
            
//             <div className="space-y-6">
//               {/* Donation Details Section */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-medium mb-4 text-lg">Donation Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2">
//                       <ShoppingBag className="w-5 h-5 text-gray-500" />
//                       <span><strong>Food Type:</strong> {donation?.foodType}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-5 h-5 text-gray-500" />
//                       <span><strong>Quantity:</strong> {donation?.quantity} servings</span>
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2">
//                       <MapPin className="w-5 h-5 text-gray-500" />
//                       <span><strong>Pickup Location:</strong> {donation?.pickupLocation}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-5 h-5 text-gray-500" />
//                       <span><strong>Created:</strong> {new Date(donation?.createdAt).toLocaleDateString()}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Receipt Details Section */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-medium mb-4 text-lg">Receipt Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <p><strong>Receipt ID:</strong> <span className="font-mono">{receipt.receiptId}</span></p>
//                     <p><strong>Donor Organization:</strong> {receipt.donor}</p>
//                     <p><strong>Recipient:</strong> {receipt.recipient}</p>
//                   </div>
//                   <div className="space-y-2">
//                     <p><strong>Item Name:</strong> {receipt.itemName}</p>
//                     <p><strong>Quantity:</strong> {receipt.quantity} servings</p>
//                     <p><strong>Date:</strong> {new Date(receipt.date).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* QR Code Section */}
//               {receipt.qrCode && (
//                 <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg">
//                   <h3 className="font-medium mb-4 text-lg">Pickup QR Code</h3>
//                   <div className="bg-white p-3 rounded-lg shadow-sm">
//                     <img 
//                       src={receipt.qrCode} 
//                       alt="Pickup QR Code" 
//                       className="w-48 h-48"
//                     />
//                   </div>
//                   <p className="text-sm text-gray-600 mt-4 text-center">
//                     Show this QR code when picking up your donation
//                   </p>
//                 </div>
//               )}
              
//               <div className="flex flex-col gap-3">
//                 <button 
//                   onClick={() => window.print()}
//                   className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
//                 >
//                   Print Receipt
//                 </button>
//                 <button 
//                   className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
//                   onClick={() => navigate('/dashboard')}
//                 >
//                   Return to Dashboard
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Confirm Donation Claim</h2>
          
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
//               {error}
//             </div>
//           )}
          
//           {donation && (
//             <div className="space-y-4 mb-6">
//               <div className="flex items-center gap-2">
//                 <ShoppingBag className="w-5 h-5 text-gray-500" />
//                 <span className="font-medium">{donation.foodType}</span>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-gray-500" />
//                 <span>{donation.pickupLocation}</span>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <Clock className="w-5 h-5 text-gray-500" />
//                 <span>{donation.quantity} servings</span>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-medium mb-2">Additional Details</h3>
//                 <p className="text-sm text-gray-600">{donation.itemDetails}</p>
//               </div>
//             </div>
//           )}
          
//           <div className="space-y-3">
//             <button
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//               onClick={handleClaim}
//               disabled={loading}
//             >
//               {loading ? 'Processing...' : 'Confirm Claim'}
//             </button>
            
//             <button
//               className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
//               onClick={() => navigate('/dashboard')}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReservationPage;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Clock, ShoppingBag, Check } from 'lucide-react';
import { ReceiptGenerator } from './RecieptGenerator';
import axios from 'axios';
// import jsPDF from 'jspdf';
import { formatDate } from '../utils';

const ReservationPage = () => {
  const [donation, setDonation] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const donationId = location.state?.donationId;

  useEffect(() => {
    if (!donationId) {
      navigate('/dashboard');
      return;
    }
    fetchDonationDetails();
  }, [donationId, navigate]);

  const fetchDonationDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/recipient/dashboard/${donationId}`, {
        headers: { 'x-auth-token': token }
      });
      setDonation(response.data);
    } catch (error) {
      setError('Failed to fetch donation details');
      console.error('Error fetching donation:', error);
    }
  };

  const handleClaim = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }
  
      const response = await axios.post(`/api/recipient/claim/${donationId}`, {}, {
        headers: { 'x-auth-token': token }
      });

      // setReceipt(response.data.receipt);
      // setSuccess(true);
      // setLoading(false);
      // Check if we received both donation and receipt data
      if (response.data.receipt && response.data.donation) {
        setReceipt(response.data.receipt);
        setDonation(response.data.donation);
        setSuccess(true);
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to claim donation');
    }finally {
      setLoading(false); // Ensure loading state is set to false
    }
  };

  const handleDownloadPDF = async () => {
    try {
      if (!donation || !receipt) {
        throw new Error('Missing donation or receipt data');
      }

      const generator = new ReceiptGenerator(donation, receipt);
      const doc = await generator.generateReceipt();
      doc.save(`Receipt_${receipt.receiptId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF receipt. Please try again.');
    }
  };

  if (success && receipt) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Check className="text-green-500" />
                Donation Claimed Successfully
              </h2>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Confirmed
              </span>
            </div>

            <div className="space-y-6">
              {/* Donation Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-4 text-lg">Donation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-gray-500" />
                      <span><strong>Food Type:</strong> {donation?.foodType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span><strong>Quantity:</strong> {donation?.quantity} servings</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span><strong>Pickup Location:</strong> {donation?.pickupLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span><strong>Created:</strong> {new Date(donation?.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receipt Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-4 text-lg">Receipt Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p><strong>Receipt ID:</strong> <span className="font-mono">{receipt.receiptId}</span></p>
                    <p><strong>Donor Organization:</strong> {receipt.donor}</p>
                    <p><strong>Recipient:</strong> {receipt.recipient}</p>
                  </div>
                  <div className="space-y-2">
                    <p><strong>Item Name:</strong> {receipt.itemName}</p>
                    <p><strong>Quantity:</strong> {receipt.quantity} servings</p>
                    <p><strong>Date:</strong> {new Date(receipt.date).toLocaleDateString()}</p>
                  </div>
                </div>
// import React from 'react';
// import { Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
// import { motion } from 'framer-motion';
// import styles from '../styles/Reservation.css';

// const ModernReservation = () => {
//   const reservation = {
//     id: "RES-2024-001",
//     status: "Confirmed",
//     donor: {
//       name: "Fresh Foods Market",
//       address: "123 Market Street",
//       phone: "+1 (555) 123-4567",
//       instructions: "Use the back entrance and ask for Manager Mike."
//     },
//     items: [
//       { name: "Fresh Vegetables", quantity: "5 kg" },
//       { name: "Bread", quantity: "10 loaves" },
//       { name: "Dairy Products", quantity: "3 items" }
//     ],
//     pickup: {
//       date: "Today",
//       time: "5:00 PM - 6:00 PM",
//       window: "60 minutes"
//     }
//   };

//   return (
//     <motion.div 
//       className={styles.container}
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div className={styles.content} animate={{ scale: [0.98, 1] }} transition={{ duration: 0.3 }}>
        
//         {/* Header */}
//         <div className={styles.header}>
//           <h1 className={styles.title}>Reservation Details</h1>
//           <p className={styles.reservationId}>#{reservation.id}</p>
//         </div>

//         {/* Status Card with Framer Motion */}
//         <motion.div 
//           className={styles.card}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className={styles.cardHeader}>
//             <h2 className={styles.cardTitle}>Status</h2>
//             <motion.span
//               className={`${styles.statusBadge} ${
//                 reservation.status === "Confirmed" 
//                   ? styles.statusConfirmed 
//                   : styles.statusPending
//               }`}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               {reservation.status === "Confirmed" && (
//                 <CheckCircle className={styles.statusIcon} />
//               )}
//               {reservation.status}
//             </motion.span>
//           </div>
//         </motion.div>

//         {/* Donor Information */}
//         <motion.div 
//           className={styles.card}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <h2 className={styles.cardTitle}>Donor Information</h2>
//           <div className={styles.donorInfo}>
//             <p className={styles.donorName}>{reservation.donor.name}</p>
//             <p className={styles.infoRow}>
//               <MapPin className={styles.icon} />
//               {reservation.donor.address}
//             </p>
//             <p className={styles.infoRow}>
//               <Phone className={styles.icon} />
//               {reservation.donor.phone}
//             </p>
//             <div className={styles.instructions}>
//               <p>{reservation.donor.instructions}</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Pickup Details */}
//         <motion.div 
//           className={styles.card}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <h2 className={styles.cardTitle}>Pickup Details</h2>
//           <div className={styles.pickupInfo}>
//             <div className={styles.infoRow}>
//               <Clock className={styles.icon} />
//               <span>{reservation.pickup.date} at {reservation.pickup.time}</span>
//             </div>
//             <div className={styles.pickupWindow}>
//               <p>Pickup window: {reservation.pickup.window}</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Reserved Items */}
//         <motion.div 
//           className={styles.card}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           <h2 className={styles.cardTitle}>Reserved Items</h2>
//           <div className={styles.itemsList}>
//             {reservation.items.map((item, index) => (
//               <div key={index} className={styles.itemRow}>
//                 <span className={styles.itemName}>{item.name}</span>
//                 <span className={styles.itemQuantity}>{item.quantity}</span>
              </div>

              {/* QR Code Section */}
              {receipt.qrCode && (
                <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium mb-4 text-lg">Pickup QR Code</h3>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <img 
                      src={receipt.qrCode} 
                      alt="Pickup QR Code" 
                      className="w-48 h-48"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Show this QR code when picking up your donation
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => window.print()}
                  // className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                  style={{ backgroundColor: 'gray', color: 'white' }} 
                >
                  Print Receipt
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                  Download PDF
                </button>
                <button 
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => navigate('/dashboard')}
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Loading and error handling UI */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Confirm Donation Claim</h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}
          {donation && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{donation.foodType}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>{donation.pickupLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>Quantity: {donation.quantity} servings</span>
              </div>
            </div>
          )}
          <button 
            onClick={handleClaim}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Claiming...' : 'Claim Donation'}

//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div 
//           className={styles.actions}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <button className={styles.cancelButton}>
//             Cancel Reservation
//           </button>
//           <button className={styles.confirmButton}>
//             Confirm Pickup
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


export default ReservationPage;

// export default ModernReservation;

