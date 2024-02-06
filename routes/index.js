import healthzRouter from './healthzRouter.js';
// Initialize of all routes
const initializeRoutes = (app) => {

    app.use('/healthz', healthzRouter);

    app.use((req, res) => {
        res.status(404).send();
    })
}

export default initializeRoutes;