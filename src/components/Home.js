import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen">
      {isSidebarVisible && <Sidebar onToggle={toggleSidebar} />}
      <ChatArea isSidebarVisible={isSidebarVisible} onToggle={toggleSidebar} />
    </div>
  );
};

export default Home;
