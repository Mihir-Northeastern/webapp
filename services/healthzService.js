import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
// Connection to the database
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

export const testConnection = async () => {
        await sequelize.authenticate();
};