import { WebSocketServer, WebSocket } from "ws";
import { MessageService } from "../services/message.service";
import { IMessage, WS_MESSAGE_TYPE } from "../../../shared/types";

type WSHandler = (wss: WebSocketServer, messageService: MessageService) => void;

const createWSHandler: WSHandler = (wss, messageService) => {
  const messageHandler =
    (ws: WebSocket) => (event: { type: string; message?: IMessage }) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(event));
      }
    };

  wss.on("connection", (ws: WebSocket) => {
    console.log("New WebSocket connection");
    const key = Date.now();
    const handler = messageHandler(ws);
    messageService.addListener(key, handler);

    ws.on("message", (message: string) => {
      try {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === WS_MESSAGE_TYPE.ADD) {
          messageService.addMessage({
            content: parsedMessage.content,
            id: Date.now(),
          });
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
      messageService.removeListener(key);
    });
  });
};

export { createWSHandler };
