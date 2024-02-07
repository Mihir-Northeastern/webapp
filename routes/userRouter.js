import express from 'express';
import * as userController from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.route('/')
    .get(userController.getAllUser)
    .post(userController.createUser)
    .all((req, res) => {    
        res.status(405).send();
    });

userRouter.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .all((req, res) => {
        res.status(405).send();
    });    

export default userRouter;