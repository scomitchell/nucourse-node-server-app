import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    _id: String,
    title: String,
    department: String,
    subject: String,
    number: String,
    ovr_rating: {
        type: Number,
        default: 0
    },
    difficulty: {
        type: Number,
        default: 0
    },
    learning_score: {
        type: Number,
        default: 0
    }
},
    { collection: "courses" }
);
export default courseSchema;