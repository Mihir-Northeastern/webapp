import { syncdb } from './sequelize.js';
import app from './app.js';
import dotenv from 'dotenv';

// Load the environment variables from .env file
dotenv.config();


app.listen(process.env.PORT, async() => {    
    await syncdb();
    console.log(`Server is running on port ${process.env.PORT}`)
})
