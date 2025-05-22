import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { FiVideo, FiPhone, FiSearch, FiMoreVertical } from 'react-icons/fi';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  userName: string;
  messages: Message[];
  onSend: (text: string) => void;
}

export default function ChatWindow({ userName, messages, onSend }: ChatWindowProps) {
  return (
    <section className="flex-1 h-screen flex flex-col bg-gray-100">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="font-bold text-lg">{userName}</div>
        </div>
        <div className="flex gap-4 text-gray-700 text-xl">
          <FiVideo className="cursor-pointer" title="Video Call" />
          <FiPhone className="cursor-pointer" title="Voice Call" />
          <FiSearch className="cursor-pointer" title="Search in chat" />
          <FiMoreVertical className="cursor-pointer" title="More options" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {Array.isArray(messages) &&
          messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={{
               content: msg.content,
               timestamp: msg.timestamp,
            }}
            isOwn={msg.sender === 'You'}
          />
        ))}
      </div>

      {/* Input */}
      <MessageInput onSend={onSend} />
    </section>
  );
}