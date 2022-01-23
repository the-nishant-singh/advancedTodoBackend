import * as express from 'express';
import * as status from 'http-status';
import * as StandardError from 'standard-error';
import validator from 'validator';
import * as jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../../interfaces/authenticatedRequest';
import { getJwtPayload } from '../auth/helpers'

//import config
import { config } from '../../config'

// Internal Dependencies
import { User } from '../../db';

// Helpers
import { firebaseService } from '../../services/firebaseService'

export class UserRoutes {
  static JWT_SECRET = config.JWT_SECRET || 'made in india';

  public static async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body.passwordDetails;
      const match = await firebaseService.signInUser(req.user.email, currentPassword)
      if (!match) {
        throw new StandardError({ message: 'Invalid password', code: status.CONFLICT });
      }
      
      if (!validator.isStrongPassword(newPassword)) {
        throw new StandardError({ message: 'Password must contain at least 8 characters, including upper and lowercase characters, a number and a special character.', code: status.UNPROCESSABLE_ENTITY });
      }
       else {
        await firebaseService.updateUserPassword(req.user.firebaseUid, newPassword)
        const user = await User.findById(req.user._id)
        res.json({
            token: jwt.sign(getJwtPayload(user), UserRoutes.JWT_SECRET, {
              expiresIn: 31556926, // 1 year in seconds
            }),
            user
        });
      }
    } catch (error) {
      next(error);
    }
  }
  
  public static async updateProfile(req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) {
    try {
      const { name } = req.body.update
      const update:any = {}
      if(name && !name.first || !name.last){
        throw new StandardError({ message: 'First and last name are required!', code: status.CONFLICT });
      }else{
        update.name = name
      }
      const user = req.user
      await User.updateOne({_id: user._id}, update, {new: true})
      const updatedUser = await  User.findOne({_id: user._id})
      await firebaseService.updateProfile(updatedUser.firebaseUid, name)
      res.json({
        token: jwt.sign(getJwtPayload(user), UserRoutes.JWT_SECRET, {
          expiresIn: 31556926, // 1 year in seconds
        }),
        user: updatedUser
    });
    } catch(error) {
      next(error)
    }
  }
}
