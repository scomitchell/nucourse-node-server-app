import express from 'express';
import session from 'express-session'
import cors from 'cors'
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Courses/routes.js";
import ReviewRoutes from "./Reviews/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/NUCourse";
mongoose.connect(CONNECTION_STRING)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.error("MongoDB Connection error", err));

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
}));

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "nucourse",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV != "development") {
    sessionOptions.proxy = true,
        sessionOptions.cookie = {
            sameSite: "none",
            secure: true,
            domain: process.env.NODE_SERVER_DOMAIN,
        };
}

app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ReviewRoutes(app);
app.listen(process.env.PORT || 4000);