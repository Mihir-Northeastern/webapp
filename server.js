import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import initializeRoutes from './routes/index.js';
import { syncdb } from './sequelize.js';

// Load the environment variables from .env file
dotenv.config();

const app = express();

//Adding No cache for the required headers
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('X-Content-Type-Options', 'nosniff');
    next();
})

//Middleware to parse the request body
app.use((express.json()));


app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(400).send();
    } else {
        next();
    }
});

// Middleware to parse the URL encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use(cors());

initializeRoutes(app);



app.listen(process.env.PORT, async() => {    
    await syncdb();
    console.log(`Server is running on port ${process.env.PORT}`)
})