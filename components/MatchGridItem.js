import Layout from "../components/Layout";
import Styles from "../components/Theme";
import React, { useState } from "react";

// MatchGridItem Component
const MatchGridItem = ({ name, age, location, compatibilityScore }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={Styles.matchContainer}>
      <h2>{name}</h2>
      <p>
        {age}, {location}
      </p>
      <p>Compatibility Score: {compatibilityScore}%</p>
      <button style={Styles.button} onClick={openModal}>
        Verify Compatibility
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div style={Styles.modalOverlay}>
          <div style={Styles.modalContent}>
            <h2>Compatibility Details</h2>
            <p>
              You and {name} share a strong connection! Here are a few categories
              where you align:
            </p>
            <ul>
              <li>You both enjoy quiet dates.</li>
              <li>You share a love for travel.</li>
              <li>You both enjoy outdoor activities.</li>
            </ul>
            <p>
              Unlock more compatibility insights as you chat and get to know
              each other better!
            </p>
            <button style={Styles.button} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchGridItem;