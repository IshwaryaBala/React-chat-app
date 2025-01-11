import React from "react";
import { FaEye, FaEyeSlash, FaPhoneAlt, FaVideo, FaCog } from "react-icons/fa";
import { Tooltip } from "antd";

const Header = ({ isSidebarVisible, onToggle, handleCallToggle, handleVcToggle }) => {
  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-b">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full">
          {getInitials("Frankie Labadie")}
        </div>
        <div>
          <div className="font-bold text-lg">Frankie Labadie</div>
          <span className="text-sm">Online</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
          <button className="hover:text-white" onClick={onToggle}>
            {isSidebarVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
          <button className="hover:text-white" onClick={handleCallToggle}>
            <FaPhoneAlt size={18} />
          </button>
          <button className="hover:text-white" onClick={handleVcToggle}>
            <FaVideo size={18} />
          </button>
          <button className="hover:text-white">
            <FaCog size={18} />
          </button>
      </div>
    </div>
  );
};

export default Header;
