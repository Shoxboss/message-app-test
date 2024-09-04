import express from "express";
import { messageController } from "../controllers/message.controller";
import { messageService } from "../services/message.service";

const router = express.Router();
const service = messageService.getInstance();
const controller = messageController(service);

router.get("/messages", controller.getMessages);
router.post("/messages", controller.createMessage);

export default router;
