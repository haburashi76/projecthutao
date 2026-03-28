import {
    getMealInformationCustom,
    getMealInformation
} from "../api/neis.ts";

export const getMeal = async (req, res) => {
    res.json(await getMealInformation(req, res));
}

export const getMealCustom = async (req, res) => {

    const params = req.params

    const year = params["year"]

    const month = params["month"]

    res.json(await getMealInformationCustom(year, month))

}