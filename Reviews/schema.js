import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    _id: String,
    course: { type: String, ref: "CourseModel" },
    user: { type: String, ref: "UserModel" },
    ovr_rating: Number,
    difficulty: Number,
    learning_score: Number,
    notes: String
},
    { collection: "reviews" }
);
export default reviewSchema;