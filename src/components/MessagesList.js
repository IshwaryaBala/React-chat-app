import React, { useRef, useEffect } from "react";

const MessagesList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <div className="flex-grow p-4 overflow-y-scroll bg-gray-100">
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start ${msg.isIncoming ? "justify-start" : "justify-end"}`}
          >
            {msg.isIncoming && (
              <div className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full mr-2">
                {getInitials("Frankie Labadie")}
              </div>
            )}
            <div
              className={`max-w-xs p-3 rounded-lg shadow-md ${
                msg.isIncoming
                  ? "bg-white text-gray-800"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              }`}
            >
              {msg.message}
            </div>
            {!msg.isIncoming && (
              <div className="flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full ml-2">
                {getInitials("Ishwarya Balaji")}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;
