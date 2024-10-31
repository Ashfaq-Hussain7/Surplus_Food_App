import React from 'react';
import { Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import styles from '../styles/Reservation.css';

const ModernReservation = () => {
  const reservation = {
    id: "RES-2024-001",
    status: "Confirmed",
    donor: {
      name: "Fresh Foods Market",
      address: "123 Market Street",
      phone: "+1 (555) 123-4567",
      instructions: "Use the back entrance and ask for Manager Mike."
    },
    items: [
      { name: "Fresh Vegetables", quantity: "5 kg" },
      { name: "Bread", quantity: "10 loaves" },
      { name: "Dairy Products", quantity: "3 items" }
    ],
    pickup: {
      date: "Today",
      time: "5:00 PM - 6:00 PM",
      window: "60 minutes"
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Reservation Details</h1>
          <p className={styles.reservationId}>#{reservation.id}</p>
        </div>

        {/* Status Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Status</h2>
            <span className={`${styles.statusBadge} ${
              reservation.status === "Confirmed" 
                ? styles.statusConfirmed 
                : styles.statusPending
            }`}>
              {reservation.status === "Confirmed" && (
                <CheckCircle className={styles.statusIcon} />
              )}
              {reservation.status}
            </span>
          </div>
        </div>

        {/* Donor Information */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Donor Information</h2>
          <div className={styles.donorInfo}>
            <p className={styles.donorName}>{reservation.donor.name}</p>
            <p className={styles.infoRow}>
              <MapPin className={styles.icon} />
              {reservation.donor.address}
            </p>
            <p className={styles.infoRow}>
              <Phone className={styles.icon} />
              {reservation.donor.phone}
            </p>
            <div className={styles.instructions}>
              <p>{reservation.donor.instructions}</p>
            </div>
          </div>
        </div>

        {/* Pickup Details */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Pickup Details</h2>
          <div className={styles.pickupInfo}>
            <div className={styles.infoRow}>
              <Clock className={styles.icon} />
              <span>{reservation.pickup.date} at {reservation.pickup.time}</span>
            </div>
            <div className={styles.pickupWindow}>
              <p>Pickup window: {reservation.pickup.window}</p>
            </div>
          </div>
        </div>

        {/* Reserved Items */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Reserved Items</h2>
          <div className={styles.itemsList}>
            {reservation.items.map((item, index) => (
              <div key={index} className={styles.itemRow}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemQuantity}>{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.cancelButton}>
            Cancel Reservation
          </button>
          <button className={styles.confirmButton}>
            Confirm Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernReservation;