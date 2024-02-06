import express from 'express';
import {get} from '../controllers/healthzController.js';

const healthzRouter = express.Router(); 

//Middleware to check the payload - JSON (Body)
const checkPayload =(req, res, next) => {
   
    if ((req.headers['content-length'] !== undefined && req.headers['content-length'] !== '0') || Object.keys(req.query).length !== 0) {
      res.status(400).send();
    } else {
      next();
    }
  }

  //Adding 405 error for all methods except GET
healthzRouter
    .route('/')
    .get(checkPayload , get)
    .all((req, res) => {    
        res.status(405).send();
    })

export default healthzRouter;