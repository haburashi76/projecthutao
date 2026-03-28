import Timetable from 'comcigan-parser';

const timetable = new Timetable()

export const getTimetable = () => {
    return timetable
}

export const search = (name) => {
    return timetable.init().then(() => { return timetable.search(name) })
}

export const setSchool = (school) => {
    timetable.setSchool(school)
}