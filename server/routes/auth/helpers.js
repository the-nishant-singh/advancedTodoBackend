"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterFields = exports.getJwtPayload = void 0;
var moment = require("moment");
var StandardError = require("standard-error");
var validator_1 = require("validator");
var status = require("http-status");
// import fetch from 'node-fetch';
// import { config } from '../../config';
// import * as atob from 'atob';
var getJwtPayload = function (user) {
    return {
        valid: true,
        firstName: user.name.first,
        lastName: user.name.last,
        id: user._id.toString(),
        stripeCustomerId: user.stripeCustomerId,
        cardToken: user.cardToken,
        expires: moment.utc().add(1, 'day').format('YYYY-MM-DD HH:mm')
    };
};
exports.getJwtPayload = getJwtPayload;
var validateRegisterFields = function (_a) {
    var email = _a.email, password = _a.password, oauth = _a.oauth, name = _a.name;
    if (!name) {
        throw new StandardError({ message: 'First and last name is required', code: status.UNPROCESSABLE_ENTITY });
    }
    if (!name.first || !name.last) {
        throw new StandardError({ message: 'First and last name is required', code: status.UNPROCESSABLE_ENTITY });
    }
    if (!validator_1.default.matches("".concat(name.first, " ").concat(name.last), /^[a-zA-Z ]{2,30}$/)) {
        throw new StandardError({ message: 'Invalid name, valid Charactors include (A-Z) (a-z)', code: status.UNPROCESSABLE_ENTITY });
    }
    if (!email) {
        throw new StandardError({ message: 'Email is required', code: status.UNPROCESSABLE_ENTITY });
    }
    if (!validator_1.default.isEmail(email)) {
        throw new StandardError({ message: 'Invalid email', code: status.UNPROCESSABLE_ENTITY });
    }
    if (!password) {
        throw new StandardError({ message: 'Password is required', code: status.UNPROCESSABLE_ENTITY });
    }
    if (!validator_1.default.isStrongPassword(password)) {
        throw new StandardError({ message: 'Password must contain at least 8 characters, including upper and lowercase characters, a number and a special character.', code: status.UNPROCESSABLE_ENTITY });
    }
};
exports.validateRegisterFields = validateRegisterFields;
// export const verifySocialLoginRegister = async ({ oauth, accessToken, email }) => {
//   if (config.NODE_ENV === environment ) {
//     if (!accessToken) {
//       throw new StandardError({ message: 'OAuth token is required', code: status.UNPROCESSABLE_ENTITY });
//     }
//     switch (oauth) {
//       case 'GOOGLE':
//         const googleResponse = await fetch(`${config.GOOGLE_VERIFY_OAUTH_URL}?access_token=${accessToken}`);
//         if (!googleResponse.ok) {
//           throw new StandardError({ message: 'Invalid Token', code: status.UNPROCESSABLE_ENTITY });
//         }
//         break;
//       case 'FACEBOOK':
//         const facebookFesponse = await fetch(`${config.FACEBOOK_VERIFY_OAUTH_URL}?access_token=${accessToken}`);
//         if (!facebookFesponse.ok) {
//           throw new StandardError({ message: 'Invalid Token', code: status.UNPROCESSABLE_ENTITY });
//         }
//         break;
//       case 'MICROSOFT':
//         const microsoftResponse = await fetch(`${config.MICROSOFT_VERIFY_OAUTH_URL}`, {
//           headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ accessToken }` }
//         });
//         if (!microsoftResponse.ok) {
//           throw new StandardError({ message: 'Invalid Token', code: status.UNPROCESSABLE_ENTITY });
//         }
//         break;
//       case 'APPLE':
//         const encodedStringArray = accessToken.split('.');
//         const decodedData = JSON.parse(atob(encodedStringArray[1]));
//         if (decodedData.email !== email) {
//           throw new StandardError({ message: 'Invalid Token', code: status.UNPROCESSABLE_ENTITY });
//         }
//         if (decodedData.aud !== config.APPLE_CLIENT_ID && decodedData.aud !== config.APPLE_CLIENT_ID_IOS) {
//           throw new StandardError({ message: 'Invalid Token', code: status.UNPROCESSABLE_ENTITY });
//         }
//         break;
//       default:
//         throw new StandardError({ message: `${oauth} OAuth is not allowed`, code: status.UNPROCESSABLE_ENTITY });
//     }
//   }
// };
//# sourceMappingURL=helpers.js.map