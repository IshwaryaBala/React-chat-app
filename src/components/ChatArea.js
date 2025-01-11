import React, { useState } from "react";
import Header from "./Header";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import CallPopup from "./CallPopup";

const ChatArea = ({ isSidebarVisible, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [isCallPopupVisible, setIsCallPopupVisible] = useState(false);
  const [isVcPopupVisible, setIsVcPopupVisible] = useState(false);
  const [conversationStage, setConversationStage] = useState("greeting");
  const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);

  const handleCallToggle = () => {
    setIsCallPopupVisible(!isCallPopupVisible);
  };
  const handleVcToggle = () => {
    setIsVcPopupVisible(!isVcPopupVisible);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarVisible((prev) => !prev);
    onToggle(); // Toggle the main sidebar visibility state
  };

  // Get conversation options based on the current conversation stage
  const getOptions = () => {
    switch (conversationStage) {
      case "greeting":
        return ["Hi 👋", "Hello 👋", "Hi there 👋", "Hello there 👋"];
      case "howAreYou":
        return ["How are you?", "How's it going?", "What's up?"];
      case "jobOpening":
        return ["Frontend developer job", "Is there any job?", "Open roles?"];
      case "jobDescription":
        return ["What is the job description?", "Tell me about the role", "Job responsibilities?"];
      case "requiredSkills":
        return ["What skills are required?", "What are the qualifications?", "What experience do I need?"];
      case "salaryExpectations":
        return ["What is the salary?", "How much does the role pay?", "Salary range?"];
      case "location":
        return ["Is the job remote?", "Where is the job located?", "Location?"];
      case "companyCulture":
        return ["What is the company culture?", "Tell me about the company", "Company environment?"];
      case "interviewProcess":
        return ["What is the interview process?", "How do interviews work?", "Interview steps?"];
      case "applicationProcess":
        return ["How do I apply?", "How to submit my application?", "What is the application process?"];
      case "end":
        return ["Thank you", "Thanks for the info", "Goodbye"];
      default:
        return ["I'm not sure how to respond to that."];
    }
  };

  const getReply = (userMessage) => {
    switch (conversationStage) {
      case "greeting":
        setConversationStage("howAreYou");
        return userMessage === "Hi 👋" || userMessage === "Hi there 👋"
          ? "Hi there! 👋 How can I assist you today?"
          : "Hello there! 👋 How can I help you?";
      case "howAreYou":
        setConversationStage("jobOpening");
        return userMessage === "How are you?"
          ? "I'm fine. How about you?"
          : "I'm doing great, thanks for asking!";
      case "jobOpening":
        setConversationStage("jobDescription");
        return "Yes, we have an opening for a frontend developer! Would you like to know more about the job?";
      case "jobDescription":
        setConversationStage("requiredSkills");
        return "The frontend developer role involves building responsive websites and working with frameworks like React, Vue, or Angular.";
      case "requiredSkills":
        setConversationStage("salaryExpectations");
        return "We require proficiency in HTML, CSS, JavaScript, and frameworks like React or Vue. Experience with Git and API integration is also helpful.";
      case "salaryExpectations":
        setConversationStage("location");
        return "The salary range for this role is between $60,000 - $90,000 per year, depending on experience.";
      case "location":
        setConversationStage("companyCulture");
        return "The role is fully remote, but we also have an office in New York City if you prefer to work from there.";
      case "companyCulture":
        setConversationStage("interviewProcess");
        return "We have a collaborative and inclusive work environment. We encourage work-life balance and provide opportunities for career growth.";
      case "interviewProcess":
        setConversationStage("applicationProcess");
        return "The interview process includes a technical interview and a final round with HR. You'll also have a chance to meet some of the team members.";
      case "applicationProcess":
        setConversationStage("end");
        return "You can apply by sending your resume and portfolio through our job portal. We review applications within 2 weeks.";
      case "end":
        return "Thanks for the information! Best of luck with your application!";
      default:
        return "I'm not sure how to respond to that.";
    }
  };

  const handleSelectQuestion = (userMessage) => {
    // Add user's message
    setMessages((prev) => [...prev, { message: userMessage, isIncoming: false }]);

    // Get bot's reply based on the selected question
    const botReply = getReply(userMessage);
    setTimeout(() => {
      setMessages((prev) => [...prev, { message: botReply, isIncoming: true }]);
    }, 500); // Slight delay for better UX
  };

  return (
    <div className="flex flex-col flex-grow h-screen">
      <Header
        isSidebarVisible={isSidebarVisible}
        onToggle={onToggle}
        handleCallToggle={handleCallToggle}
        handleVcToggle={handleVcToggle}
      />
      <div className={`flex flex-grow ${isMobileSidebarVisible ? "flex-row" : "flex-col"} md:flex-row`}>
        {/* Chat Area */}
        <div className="flex flex-col flex-grow bg-white">
        <MessagesList messages={messages} />
      <MessageInput
        options={getOptions()}
        handleSelectQuestion={handleSelectQuestion}
      />
        </div>

        {/* Sidebar - Visible only in mobile view when toggled */}
        {isMobileSidebarVisible && isSidebarVisible && (
          <div className="absolute top-0 left-0 z-50 w-3/4 h-screen bg-gray-100 md:relative md:w-1/4">
            {/* Your sidebar content goes here */}
            <button
              onClick={toggleMobileSidebar}
              className="absolute top-4 right-4 text-gray-800 bg-gray-300 rounded-full p-2"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {isCallPopupVisible && <CallPopup onClose={handleCallToggle} isVcPopupVisible ={isVcPopupVisible}/>}
      {isVcPopupVisible && <CallPopup onClose={handleVcToggle} isVcPopupVisible ={isVcPopupVisible} />}
    </div>
  );
};

export default ChatArea;
