import React, { useState } from "react";

interface Props {
  onSend: (content: string) => void;
  className?: string;
}

const MessageInput: React.FC<Props> = ({ onSend, className }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type="text"
        className="message-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="message-send__btn" type="submit">
        Send
      </button>
    </form>
  );
};

export default MessageInput;
