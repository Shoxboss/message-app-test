import { Request, Response } from "express";
import type { MessageService } from "../services/message.service";

export const messageController = (service: MessageService) => {
  const getMessages = (req: Request, res: Response) => {
    try {
      const messages = service.getMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const createMessage = (req: Request, res: Response) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Message is required" });
      }

      service.addMessage({ id: Date.now(), content });
      res.status(201);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  return {
    getMessages,
    createMessage,
  };
};
