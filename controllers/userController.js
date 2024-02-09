import * as userService from '../services/userService.js';

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.username);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send();
    }
}

export const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).send(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(400).send();
    }
};

export const updateUser = async (req, res) => {
    try {
        await userService.updateUser(req.user.username, req.body);
        
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(400).send();
    }
}