import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js"

export default function ReviewRoutes(app) {
    app.post("/api/reviews", async (req, res) => {
        const newReview = await dao.createReview(req.body);
        await courseDao.recalculateCourseAverages(newReview.course);
        res.json(newReview);
    });

    app.delete("/api/reviews/:reviewId", async (req, res) => {
        const { reviewId } = req.params;
        const status = await dao.deleteReview(reviewId);
        res.json(status);
    });

    app.post("/api/reviews/:reviewId", async (req, res) => {
        const { reviewId } = req.params;
        const reviewUpdates = req.body;
        const status = await dao.updateReview(reviewId, reviewUpdates);
        res.json(status);
    })

    app.get("/api/reviews/course/:courseNum", async (req, res) => {
        const { courseNum } = req.params;
        const reviews = await dao.findReviewsForCourse(courseNum);
        res.json(reviews);
    });

    app.get("/api/reviews/user/:username", async (req, res) => {
        const { username } = req.params;
        const reviews = await dao.findReviewsForUser(username);
        res.json(reviews);
    });

    app.get("/api/reviews/:courseId/:rating", async (req, res) => {
        const { courseId, rating } = req.params;
        const reviews = await dao.findReviewsByRating(courseId, rating);
        res.json(reviews);
    });
}