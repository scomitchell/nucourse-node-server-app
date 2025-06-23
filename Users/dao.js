import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findUsers = () => {
    return model.find();
}

export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
}

export const findUserById = (userId) => {
    return model.findById(userId);
}

export const findUserByUsername = (username) => {
    return model.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } });
}

export const findUserByCredentials = (username, password) => {
    return model.findOne({ username: username, password: password });
}

export const updateUser = (userId, user) => {
    return model.updateOne({ _id: userId }, { $set: user });
}

export const deleteUser = (userId) => {
    return model.deleteOne({ _id: userId });
}

export const findUsersByRole = (role) => {
    return model.find({ role: role });
}