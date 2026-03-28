import express from "express";
import tellingRoutes from "./routes/tellingRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js"

const app = express();

app.use(express.json());

app.use("/telling", tellingRoutes);

app.use("/schedule", scheduleRoutes);

export default app;