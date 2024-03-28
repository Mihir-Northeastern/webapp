import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import { UserModel } from "./models/userModel.js";
import { VerifyModel } from './models/verifyModel.js';

dotenv.config();

export const sequelize = new Sequelize( 
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {   
        host: process.env.DB_HOST,     
        dialect: process.env.DB_DIALECT,
    }
);

export const User = UserModel(sequelize, DataTypes);
export const Verify = VerifyModel(sequelize, DataTypes);

export const syncdb = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection established');
        await sequelize.sync({alter: true});
        console.log('Database synchronized');
    }
    catch(err){
        console.log('Error: ', err);
    }
}