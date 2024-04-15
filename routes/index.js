import healthzRouter from './healthzRouter.js';
import userRouter from './userRouter.js';
// Initialize of all routes
const initializeRoutes = (app) => {

    app.use('/healthz', healthzRouter);

    app.use('/v2/user', userRouter);

    app.use((req, res) => {
        res.status(404).send();
    })
}

export default initializeRoutes;