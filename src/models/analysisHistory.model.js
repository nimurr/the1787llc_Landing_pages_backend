const mongoose = require("mongoose");

const analysisHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
        analysisDate: {
            type: Array,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("AnalysisHistory", analysisHistorySchema);