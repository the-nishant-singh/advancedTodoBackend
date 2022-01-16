"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var status = require("http-status");
var StandardError = require("standard-error");
var validator_1 = require("validator");
var jwt = require("jsonwebtoken");
var helpers_1 = require("../auth/helpers");
//import config
var config_1 = require("../../config");
// Internal Dependencies
var db_1 = require("../../db");
// Helpers
var firebaseService_1 = require("../../services/firebaseService");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.changePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, currentPassword, newPassword, match, user, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body.passwordDetails, currentPassword = _a.currentPassword, newPassword = _a.newPassword;
                        return [4 /*yield*/, firebaseService_1.firebaseService.signInUser(req.user.email, currentPassword)];
                    case 1:
                        match = _b.sent();
                        if (!match) {
                            throw new StandardError({ message: 'Invalid password', code: status.CONFLICT });
                        }
                        if (!!validator_1.default.isStrongPassword(newPassword)) return [3 /*break*/, 2];
                        throw new StandardError({ message: 'Password must contain at least 8 characters, including upper and lowercase characters, a number and a special character.', code: status.UNPROCESSABLE_ENTITY });
                    case 2: return [4 /*yield*/, firebaseService_1.firebaseService.updateUserPassword(req.user.firebaseUid, newPassword)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, db_1.User.findById(req.user._id)];
                    case 4:
                        user = _b.sent();
                        res.json({
                            token: jwt.sign((0, helpers_1.getJwtPayload)(user), UserRoutes.JWT_SECRET, {
                                expiresIn: 31556926, // 1 year in seconds
                            }),
                            user: user
                        });
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.updateProfile = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var name_1, update, user, updatedUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        name_1 = req.body.update.name;
                        update = {};
                        if (name_1 && !name_1.first || !name_1.last) {
                            throw new StandardError({ message: 'First and last name are required!', code: status.CONFLICT });
                        }
                        else {
                            update.name = name_1;
                        }
                        user = req.user;
                        return [4 /*yield*/, db_1.User.updateOne({ _id: user._id }, update, { new: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db_1.User.findOne({ _id: user._id })];
                    case 2:
                        updatedUser = _a.sent();
                        return [4 /*yield*/, firebaseService_1.firebaseService.updateProfile(user.firebaseUid, name_1)];
                    case 3:
                        _a.sent();
                        res.json({
                            token: jwt.sign((0, helpers_1.getJwtPayload)(user), UserRoutes.JWT_SECRET, {
                                expiresIn: 31556926, // 1 year in seconds
                            }),
                            user: user
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.JWT_SECRET = config_1.config.JWT_SECRET || 'made in india';
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=routes.js.map