import React from "react";
import { FaPhoneAlt, FaVideo } from "react-icons/fa";

const CallPopup = ({ onClose, isVcPopupVisible }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center p-12">
        <div className="flex justify-center mb-4">
          {/* Corrected conditional rendering */}
          {isVcPopupVisible ? (
            <FaVideo size={48} className="text-green-500" />
          ) : (
            <FaPhoneAlt size={48} className="text-green-500" />
          )}
        </div>
        <div className="text-xl font-bold mb-4">Calling Frankie Labadie</div>
        <div className="flex justify-center space-x-4 mt-8">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            onClick={onClose}
          >
            Cut
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            onClick={onClose}
          >
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallPopup;
