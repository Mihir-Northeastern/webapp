import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import initializeRoutes from './routes/index.js';
import logger from './logger.js';
import expressWinston from 'express-winston';

// Load the environment variables from .env file
dotenv.config();

const app = express();

app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

//Adding No cache for the required headers
app.use((req, res, next) => {
    
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('X-Content-Type-Options', 'nosniff');
        
        if (req.method === 'OPTIONS') {
            res.status(405).send();
        } else {
            next();
        }
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

export default app;