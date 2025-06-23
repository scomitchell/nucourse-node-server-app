import * as dao from "./dao.js"

export default function UserRoutes(app) {
    app.get("/api/users", async (req, res) => {
        const users = await dao.findUsers();
        res.json(users);
    });

    app.post("/api/users", async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    });

    app.get("/api/users/:userId", async (req, res) => {
        const { userId } = req.params;
        const user = await dao.findUserById(userId);
        res.json(user);
    });

    app.put("/api/users/:userId", async (req, res) => {
        const { userId } = req.params;
        const userUpdates = req.body;

        await dao.updateUser(userId, userUpdates);

        // Re-fetch the updated user
        const updatedUser = await dao.findUserById(userId);

        // Only update session if it's the current user
        if (req.session["currentUser"] && req.session["currentUser"]._id === userId) {
            req.session["currentUser"] = updatedUser;
        }

        res.json(updatedUser);
    });

    app.delete("/api/users/:userId", async (req, res) => {
        const { userId } = req.params;
        const status = await dao.deleteUser(userId);
        res.json(status);
    })

    app.get("/api/users/:role", async (req, res) => {
        const { role } = req.params;
        const users = await dao.findUsersByRole(role);
        res.json(users);
    });

    app.get("/api/users/username/:username", async (req, res) => {
        const { username } = req.params;
        const user = await dao.findUserByUsername(username);
        res.json(user);
    });

    app.post("/api/users/signin", async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);

        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Unable to login" });
        }
    });

    app.post("/api/users/signup", async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username is already in use" });
            return;
        }

        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    })

    app.post("/api/users/signout", async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    });

    app.post("/api/users/profile", async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }

        res.json(currentUser);
    });
}