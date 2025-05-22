import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiSettings,
  FiPhone,
  FiMessageSquare,
  FiChevronDown,
} from 'react-icons/fi';

interface ChatListProps {
  chats?: {
    id: string;
    name: string;
    lastMessage: string;
    avatar?: string; 
  }[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
}

export default function ChatList({ chats, activeChatId, onSelectChat }: ChatListProps) {
  return (
    <aside className="w-1/3 h-screen bg-white border-r flex flex-col">
      {/* Header */}
      <div className="p-3 border-b flex items-center justify-between bg-gray-50">
        <h2 className="text-lg font-bold">Chat-App</h2>
        <div className="flex gap-3 text-gray-700 text-lg">
          <FiFilter className="cursor-pointer" title="Filter" />
          <FiPlus className="cursor-pointer" title="New Chat" />
          <FiSettings className="cursor-pointer" title="Settings" />
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b flex items-center gap-2">
        <FiSearch className="text-gray-600" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto flex-1">
        {Array.isArray(chats) &&
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
                activeChatId === chat.id ? 'bg-gray-200' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
                    {chat.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-medium">{chat.name}</p>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FiPhone title="Call" />
                <FiMessageSquare title="Message" />
                <FiChevronDown title="More options" />
              </div>
            </div>
          ))}
      </div>

      {/* Footer status bar */}
      <div className="border-t px-3 py-2 text-xs text-gray-500 bg-gray-50 flex justify-between items-center">
        <span>5 / 6 phones</span>
        <div className="flex gap-2 text-gray-500 text-lg">
          <FiSettings className="cursor-pointer" title="Footer Settings" />
        </div>
      </div>
    </aside>
  );
}
