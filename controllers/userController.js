import * as userService from '../services/userService.js';
import { Verify } from '../sequelize.js';

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

export const verifyUser = async (req, res) => {
    const { uid } = req.query;
    if (!uid) {
        return res.status(403).send({ message: 'UID is required' });
    }

    try {
        const verifyRecord = await Verify.findOne({ where: { uid } });
        if (!verifyRecord) {
            return res.status(403).send({ message: 'Verification record not found' });
        }

        const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
        if (verifyRecord.createdAt < twoMinutesAgo) {
            return res.status(403).send({ message: 'Verification link has expired' });
        }

        await verifyRecord.update({ verified: true });

        return res.status(200).send({ message: 'Link has been verified' });
    } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};
