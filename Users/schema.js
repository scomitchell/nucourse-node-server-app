import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ["USER", "ADMIN", "FACULTY"],
        default: "USER",
    },
},
    { collection: "users" }
);

export default userSchema;