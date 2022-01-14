import * as express from 'express';
import { AuthRoutes } from './routes';

class AuthRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.post('/register', AuthRoutes.register);
    this.router.post('/login', AuthRoutes.login);
  }
}

export const authRouter = new AuthRouter().router
