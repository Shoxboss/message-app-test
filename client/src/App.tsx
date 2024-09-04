import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchMessages, createMessage } from "./api/message.api";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { useWebSocket } from "./hooks/useWebSocket";
import { IMessage, WS_MESSAGE_TYPE } from "../../shared/types";
import "./App.css";

const App: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: messages = [], refetch } = useQuery("messages", fetchMessages);
  const ws = useWebSocket("ws://localhost:3001");

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === WS_MESSAGE_TYPE.ADDED) {
          queryClient.setQueryData<IMessage[]>("messages", (old) => {
            return old ? [...old, data.message] : [data.message];
          });
        } else if (data.type === WS_MESSAGE_TYPE.REMOVED) {
          queryClient.setQueryData<IMessage[]>("messages", (old) => {
            return old?.filter((item) => item.id != data.message.id) ?? [];
          });
        }
      };
    }

    return () => {
      ws?.close();
    };
  }, [queryClient, ws]);

  const handleSend = async (content: string) => {
    if (ws?.OPEN) {
      ws.send(JSON.stringify({ content, type: WS_MESSAGE_TYPE.ADD }));
    } else {
      await createMessage(content);
    }
    refetch();
  };

  return (
    <div className="main">
      <h1 className="message-title">Messages</h1>
      <MessageList className="message-list" messages={messages} />
      <MessageInput  className="message-form" onSend={handleSend} />
    </div>
  );
};

export default App;
