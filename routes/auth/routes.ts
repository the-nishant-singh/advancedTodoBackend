// NPM Dependencies
import * as express from 'express';
import * as status from 'http-status';
import * as StandardError from 'standard-error';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import { User, } from "../../db";
import { getJwtPayload, validateRegisterFields } from './helpers';

//fiebase admin service
import { firebaseService } from '../../services/firebaseService';

export class AuthRoutes {
  static JWT_SECRET = config.JWT_SECRET || 'i am a tea pot';

  public static async register(req: express.Request, res: express.Response, next) {
    try {
      const { email, password, oauth, name } = req.body.user;
      validateRegisterFields(req.body.user)
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new StandardError({ message: 'Email already in use', code: status.CONFLICT });
      }
      let firebaseAuthUser = await firebaseService.createUser( name, email, password )
      let { uid } = firebaseAuthUser;
      const user = await User.create({ email, firebaseUid: uid , name, oauth, hasPassword: true});
      res.json({
        token: jwt.sign(getJwtPayload(user), AuthRoutes.JWT_SECRET, {
          expiresIn: 31556926, // 1 year in seconds
        }),
        user
      });
    } catch (error) {
      next(error);
    }
  }
  public static async login(req: express.Request, res: express.Response, next) {
    try {
      const { email, password } = req.body.user;
      if (!email || !password) {
        throw new StandardError({ message: 'Email and Password are requried', code: status.UNPROCESSABLE_ENTITY });
      }
      const firebaseUser: any = (await firebaseService.signInUser(email, password)).user.toJSON()
      const user = await User.findOne({ firebaseUid: firebaseUser.uid });
      if (!user) {
        throw new StandardError({ message: 'Invalid email or password', code: status.CONFLICT });
      }
      res.json({
        token: jwt.sign(getJwtPayload(user), AuthRoutes.JWT_SECRET, {
          expiresIn: 31556926, // 1 year in seconds
        }),
        user
      });
    } catch (error) {
      next(error);
    }
  }
  public static async sendResetEmail(req: express.Request, res: express.Response, next) {

    try {
      const email = req.body.email;
      if (!email) {
        throw new StandardError({ message: 'Email is requried ', code: status.UNPROCESSABLE_ENTITY });
      }
      const user = await User.findOne({ email });
      if (!user) {
        throw new StandardError({ message: 'Invalid email ', code: status.CONFLICT });
      }
      const data = firebaseService.sendResetEmail(email)
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}
