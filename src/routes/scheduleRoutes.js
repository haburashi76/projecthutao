import express from "express";
import {
    getSchedule,
    getAllSchedules
} from "../controllers/schedulerController.js";

const router = express.Router();

router.get("/:grade/:class", getSchedule);

router.get("", getAllSchedules);

export default router;