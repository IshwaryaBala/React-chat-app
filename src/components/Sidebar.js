import { FaThumbtack, FaPlus } from "react-icons/fa";
import react,{ useState } from "react";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const chats = [
    { name: "John", message: "Hello, how are you?", time: "10:15" },
    { name: "Viswa", message: "Meeting at 2 PM", time: "11:00" },
    { name: "Juhi", message: "Meeting at 4 PM", time: "1:00", pinned: true },
    { name: "Sameer", message: "Let's catch up soon!", time: "2:30" },
    { name: "Sathish", message: "Don't forget the deadline.", time: "3:15" },
    { name: "Anu", message: "Dinner plans tonight?", time: "4:00" },
    // Add more chat items as needed
  ];

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateColor = (name) => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word[0].toUpperCase()).join("");
    return initials;
  };

  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(user)
        ? prevSelectedUsers.filter((u) => u !== user)
        : [...prevSelectedUsers, user]
    );
  };

  const handleCreateGroup = () => {
    const newGroup = {
      name: groupName,
      message: "New group created",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pinned: false,
      group: true,
      members: selectedUsers,
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setIsModalOpen(false);
    setGroupName("");
    setSelectedUsers([]);
  };

  return (
    <div className="w-80 bg-white border-r flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-full`}
          >
            {getInitials("Ishwary Balaji")}
          </div>
          <div className="font-bold text-lg ml-2">Ishwarya Balaji</div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-blue-500 hover:underline">Sign Out</button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Create Group Button */}
      <div className="px-4 mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center text-blue-500 hover:underline"
        >
          <FaPlus className="mr-2" />
          Create Group
        </button>
      </div>

      {/* Pinned Section */}
      <div className="px-4 mb-4">
        <h3 className="font-semibold mb-2">Pinned</h3>
        <ul>
          {chats
            .filter((chat) => chat.pinned)
            .map((chat, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition duration-300"
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 ${generateColor(
                      chat.name
                    )} text-white flex items-center justify-center rounded-full mr-4`}
                  >
                    {chat.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold">{chat.name}</div>
                    <div className="text-sm text-gray-500">{chat.message}</div>
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  <FaThumbtack /> {chat.time}
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* Groups Section */}
      {groups.length > 0 && (
        <div className="px-4 mb-4">
          <h3 className="font-semibold mb-2">Groups</h3>
          <ul>
            {groups.map((group, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition duration-300"
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 ${generateColor(
                      group.name
                    )} text-white flex items-center justify-center rounded-full mr-4`}
                  >
                    {getInitials(group.name)}
                  </div>
                  <div>
                    <div className="font-semibold">{group.name}</div>
                    <div className="text-sm text-gray-500">{group.message}</div>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{group.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* All Chats Section */}
      <div className="px-4 flex-grow overflow-y-auto overflow-hidden">
        <h3 className="font-semibold mb-2">All Chats</h3>
        <ul>
          {filteredChats.map((chat, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition duration-300"
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 ${generateColor(
                    chat.name
                  )} text-white flex items-center justify-center rounded-full mr-4`}
                >
                  {chat.name[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold">{chat.name}</div>
                  <div className="text-sm text-gray-500">{chat.message}</div>
                </div>
              </div>
              <span className="text-sm text-gray-400">
                {chat.pinned && <FaThumbtack />} {chat.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Create Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 mb-4"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <h3 className="font-semibold mb-2">Select Users</h3>
            <ul>
              {chats.map((chat, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition duration-300"
                  onClick={() => handleUserSelect(chat.name)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 ${generateColor(
                        chat.name
                      )} text-white flex items-center justify-center rounded-full mr-4`}
                    >
                      {chat.name[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold">{chat.name}</div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {selectedUsers.includes(chat.name) && <FaThumbtack />}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                className="text-red-500 hover:underline mr-4"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleCreateGroup}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
