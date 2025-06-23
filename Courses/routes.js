import * as dao from "./dao.js"

export default function CourseRoutes(app) {
    app.get("/api/courses", async (req, res) => {
        const { title } = req.query;
        if (title) {
            const courses = await dao.findCourseByPartialTitle(title);
            res.json(courses);
            return;
        }

        const courses = await dao.findAllCourses();
        res.json(courses);
    });

    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    });

    app.get("/api/courses/:courseNum", async (req, res) => {
        const { courseNum } = req.params;
        const course = await dao.findCourseByNumber(courseNum);
        res.json(course);
    });

    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;

        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });

    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.send(status);
    });
}