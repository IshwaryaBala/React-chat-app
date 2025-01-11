import React from "react";

const MessageInput = ({ options, handleSelectQuestion }) => (
    <div className="p-4 flex gap-2 justify-center">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleSelectQuestion(option)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded"
        >
          {option}
        </button>
      ))}
    </div>
  );
  

export default MessageInput;
