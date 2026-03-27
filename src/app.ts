import express from "express";
import tellingRoutes from "./routes/tellingRoutes";

const app = express();

app.use(express.json());

app.use("/telling", tellingRoutes);

export default app;