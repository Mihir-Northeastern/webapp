import express from 'express';
import {auth} from '../authentication/auth.js';
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

const checkPayload =(req, res, next) => {
   
    if ((req.headers['content-length'] !== undefined && req.headers['content-length'] !== '0') || Object.keys(req.query).length !== 0) {
      res.status(400).send();
    } else {
      next();
    }
  }

userRouter.route('/')
    .post(userController.createUser)
    .all((req, res) => {    
        res.status(405).send();
    });

userRouter.route('/self')
    .get(auth, checkPayload, userController.getUserById)
    .put(auth, userController.updateUser)
    .all((req, res) => {
        res.status(405).send();
    });    

export default userRouter;