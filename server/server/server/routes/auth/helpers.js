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
//# sourceMappingURL=helpers.js.map