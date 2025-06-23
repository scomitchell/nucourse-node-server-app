import model from "./model.js";
import reviewModel from "../Reviews/model.js"
import { v4 as uuidv4 } from "uuid";

export const findAllCourses = () => {
    return model.find();
}

export const createCourse = (course) => {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
}

export const findCourseByNumber = (courseNum) => {
    return model.findOne({ number: courseNum });
}

export const findCourseByPartialTitle = (partialTitle) => {
    const regex = new RegExp(partialTitle, "i");
    return model.find({ title: { $regex: regex } });
}

export const updateCourse = (courseNum, course) => {
    return model.updateOne({ number: courseNum }, { $set: course });
}

export const deleteCourse = (courseId) => {
    return model.deleteOne({ _id: courseId });
}

export const recalculateCourseAverages = async (courseNum) => {
    const reviews = await reviewModel.find({ course: courseNum });

    const avg = (key) =>
        reviews.length ? Math.round(reviews.reduce((sum, r) => sum + Number(r[key]), 0) / reviews.length * 10) / 10 : 0;

    const newAverages = {
        ovr_rating: avg("ovr_rating"),
        difficulty: avg("difficulty"),
        learning_score: avg("learning_score"),
    };

    await model.updateOne({ number: courseNum }, { $set: newAverages });
}