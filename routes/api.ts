import * as express from 'express';
import * as status from 'http-status';

import { authRouter } from './auth'

export const api = express.Router();


api.use('/auth', authRouter);
api.use((err, req, res, next) => {
    console.log(err);
    res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
});