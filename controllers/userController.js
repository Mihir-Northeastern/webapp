import * as userService from '../services/userService.js';

export const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        res.status(200).send(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
}

export const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).send(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
};

export const updateUser = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(204).send();
        return;
    }
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.status(200).send(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
}