import express from "express";
import {
    getTimetable,
    search,
    setSchool,
} from "../controllers/timetableController.js"

const router = express.Router();

const timetable = getTimetable();

export const getTimetable_ = async (req, res) => {
    try {
        const params = req.params;

        const grade = params["grade"]

        const clazz = params["class"]

        await timetable.init();

        const schools = await timetable.search("구로고");

        const school = schools[0];
        setSchool(school.code);

        await timetable.getTimetable().then((result) => {
            res.json(result[grade][clazz]);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "실패" });
    }
};

router.get("/:grade/:class", getTimetable_)

export default router;

