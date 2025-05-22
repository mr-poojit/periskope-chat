import { useState } from 'react';
import { FiSend, FiPaperclip, FiMic, FiSmile } from 'react-icons/fi';

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <div className="p-4 bg-white border-t flex items-center gap-2">
      <button><FiSmile className="text-xl text-gray-500" /></button>
      <button><FiPaperclip className="text-xl text-gray-500" /></button>
      <input
        type="text"
        className="flex-1 p-2 border rounded-full text-sm"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      {text ? (
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <FiSend />
        </button>
      ) : (
        <button className="bg-gray-100 text-gray-700 p-2 rounded-full">
          <FiMic />
        </button>
      )}
    </div>
  );
}
