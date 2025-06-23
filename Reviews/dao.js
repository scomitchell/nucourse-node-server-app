import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findReviewsForCourse = (courseNum) => {
    return model.find({ course: courseNum });
}

export const findReviewsForUser = (username) => {
    return model.find({ user: username });
}

export const createReview = (review) => {
    const newReview = { ...review, _id: uuidv4() };
    return model.create(newReview);
}

export const findReviewsByRating = (courseId, rating) => {
    const lowerBound = rating;
    const upperBound = rating + 0.99;
    return model.find({
        ovr_rating: { $gte: lowerBound, $lte: upperBound },
        course: courseId
    });
}

export const deleteReview = (reviewId) => {
    return model.deleteOne({ _id: reviewId });
}

export const updateReview = (reviewId, review) => {
    return model.updateOne({ _id: reviewId }, { $set: review });
}