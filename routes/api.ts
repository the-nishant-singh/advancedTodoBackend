import * as express from 'express';
import * as status from 'http-status';

import { Middleware } from '../services/middleware';

import { authRouter } from './auth';
import { UserRouter } from './user';

const middleware = new Middleware();
export const api = express.Router();
api.use(middleware.jwtDecoder);

api.use('/auth', authRouter);
api.use('/user', new UserRouter().router);
api.use((err, req, res, next) => {
    console.log(err);
    res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
});