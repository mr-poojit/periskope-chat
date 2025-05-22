export default function MessageBubble({
  message,
  isOwn,
}: {
  message: { content: string; timestamp: string };
  isOwn: boolean;
}) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-sm px-4 py-2 rounded-xl text-sm ${
          isOwn ? 'bg-blue-500 text-white' : 'bg-white text-black border'
        }`}
      >
        <div>{message.content}</div>
        <div className="text-xs text-right text-gray-400 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}

