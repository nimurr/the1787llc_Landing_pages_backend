const { analysisHistoryService } = require("../services");

const createHistory = async (req, res) => {

    const { _id } = req.user
    const body = req.body

    const data = { userId: _id, analysisDate: [body] }

    try {

        const history = await analysisHistoryService.createHistory(data);
        res.status(200).send({
            message: "History Created",
            status: "OK",
            statusCode: 201,
            data: history
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createHistory
}