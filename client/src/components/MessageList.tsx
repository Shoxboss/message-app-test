import React from "react";

interface Message {
  id: number;
  content: string;
}

interface Props {
  messages: Message[];
  className?: string;
}

const MessageList: React.FC<Props> = ({ messages, className }) => {
  return (
    <ul className={className}>
      {messages.map((message) => (
        <li key={message.id} className="message-item">
          {message.content}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
