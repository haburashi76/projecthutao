import express from "express";
import tellingRoutes from "./routes/tellingRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js"
import mealRoutes from "./routes/mealRoutes.js";

const app = express();

app.use(express.json());

app.use("/telling", tellingRoutes);

app.use("/schedule", scheduleRoutes);

app.use("/meal", mealRoutes);

export default app;