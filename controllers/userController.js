import * as userService from '../services/userService.js';



export const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).send(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
};