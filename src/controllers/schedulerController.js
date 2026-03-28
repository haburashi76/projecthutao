import {
    getTimetable,
    search,
    setSchool,
} from "../api/timetable.js"
import {schoolName} from "../openInformations.js";

const timetable = getTimetable();

export const getSchedule = async (req, res) => {
    try {
        const params = req.params;

        const grade = params["grade"]

        const clazz = params["class"]

        await timetable.init();

        const schools = await search(schoolName);

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

export const getAllSchedules = async (req, res) => {
    try {

        await timetable.init();

        const schools = await search(schoolName);

        const school = schools[0];

        setSchool(school.code);

        await timetable.getTimetable().then((result) => {
            res.json(result);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "실패" });
    }
};