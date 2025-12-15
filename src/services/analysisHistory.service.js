const { AnalysisHistory } = require("../models");


const createHistory = async (data) => {
    try {
        const history = await AnalysisHistory.create(data);
        return history
    } catch (error) {
        console.log(error);
    }
}

const getHistory = async (id) => {
    try {
        const history = await AnalysisHistory.find({ userId: id });
        return history
    } catch (error) {
        console.log(error);
    }
}

const getHistoryById = async (id) => {
    try {
        const history = await AnalysisHistory.findById(id);
        return history
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createHistory,
    getHistory,
    getHistoryById
}