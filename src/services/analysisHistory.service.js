const { AnalysisHistory } = require("../models");


const createHistory = async (data) => {
    try {
        const history = await AnalysisHistory.create(data);

        return history
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createHistory
}