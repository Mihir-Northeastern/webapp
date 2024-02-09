import express from 'express';
import {auth} from '../authentication/auth.js';
import * as userController from '../controllers/userController.js';
import * as healthZService from '../services/healthZService.js';

const userRouter = express.Router();

const checkPayload =(req, res, next) => {
   
    if ((req.headers['content-length'] !== undefined && req.headers['content-length'] !== '0') || Object.keys(req.query).length !== 0) {
      res.status(400).send();
    } else {
      next();
    }
  }
 
const checkdbStatus = async (req, res, next) => {
    try {
        await healthZService.testConnection();
        return next();
        
    } catch (err) {
        return res.status(503).send();
    }
}

// create schema validation function for user post
const validPost = (allow, ignore) => {
   let valid = true;
   return (req, res, next) => {
       if(Object.keys(req.query).length){
            valid = false;
       }
       else{
        const keys = Object.keys(req.body);

        if(ignore){
            ignore.forEach(key => {
              const idx = keys.indexOf(key);
              if(idx > -1){
                keys.splice(idx, 1);
                delete req.body[key];
              }
            });
        }

        const propertyCheck = allow.every(key => keys.includes(key));
        const noProperty = keys.every(key => allow.includes(key));
        valid = propertyCheck && noProperty;
       }

       if(valid){
           next();
       } else { 
           res.status(400).send();
       }
   }
}

// create schema validation function for user put
const validPut = (allow, ignore) => {
    let valid = false;
    return (req, res, next) => {
        if(Object.keys(req.query).length){
            valid = false;
        }
        else{
            const keys = Object.keys(req.body);
            if(ignore){
                ignore.forEach(key => {
                  const idx = keys.indexOf(key);
                  if(idx > -1){
                    keys.splice(idx, 1);
                    delete req.body[key];
                  }
                });
            }
            const propertyCheck = allow.some(key => keys.includes(key));
            const noProperty = keys.every(key => allow.includes(key));
            valid = propertyCheck && noProperty;
        }
        if(valid){
            next();
        } else { 
            res.status(400).send();
        }
    }
}




userRouter.route('/')
    .post(checkdbStatus, validPost(["first_name", "last_name", "username", "password"],["account_created","account_updated"]),userController.createUser)
    .all((req, res) => {    
        res.status(405).send();
    });

userRouter.route('/self')
    .get(checkdbStatus, auth, checkPayload, userController.getUserById)
    .put(checkdbStatus, auth, validPut(["first_name", "last_name", "password"],["account_created","account_updated"]), userController.updateUser)
    .all((req, res) => {
        res.status(405).send();
    });    

export default userRouter;