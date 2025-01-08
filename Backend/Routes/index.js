import express from 'express';
import userRouter from './userRoutes.js';


const appRouter = express.Router();

appRouter.use("/user",userRouter);


export default appRouter;