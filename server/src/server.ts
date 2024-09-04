import dotenv from "dotenv";
import { createServer } from "http";

import { WebSocketServer } from "ws";
import { createWSHandler } from "./handlers/ws.handler";
import { messageService as MessageService } from "./services/message.service";
import app from "./app";
dotenv.config();

const port = Number(process.env.PORT) || 3001;

const server = createServer(app);
const wss = new WebSocketServer({ server }, () => {
  console.log(`WebSocket server is running on ws://localhost:${port}`);
});

const messageService = MessageService.getInstance();

createWSHandler(wss, messageService);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
