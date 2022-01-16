import * as express from 'express';
import { UserRoutes } from './routes';

export class UserRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.post('/changePassword', UserRoutes.changePassword);
    this.router.put('/update-profile', UserRoutes.updateProfile)
  }
}