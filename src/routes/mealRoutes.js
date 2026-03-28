import express from "express";
import {
    getMeal,
    getMealCustom
} from "../controllers/mealController.js";

const router = express.Router();

router.get("/:year/:month", getMealCustom);

router.get("/", getMeal);

export default router;