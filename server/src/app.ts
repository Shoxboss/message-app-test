import express from "express";
import messageRoutes from "./routes/message.routes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api", messageRoutes);

export default app;
