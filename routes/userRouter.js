import express from 'express';
import * as userController from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.route('/')
    .post(userController.createUser)
    .all((req, res) => {    
        res.status(405).send();
    });

export default userRouter;