import { FiArrowLeft, FiMoreVertical, FiRefreshCw, FiHelpCircle } from 'react-icons/fi';

export default function ChatHeader({ userName }: { userName: string }) {
  return (
    <div className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <FiArrowLeft className="text-xl cursor-pointer sm:hidden" />
        <div className="font-bold text-lg">{userName}</div>
      </div>
      <div className="flex items-center gap-4 text-gray-600">
        <FiRefreshCw className="text-xl cursor-pointer hover:text-black" />
        <FiHelpCircle className="text-xl cursor-pointer hover:text-black" />
        <FiMoreVertical className="text-xl cursor-pointer hover:text-black" />
      </div>
    </div>
  );
}
