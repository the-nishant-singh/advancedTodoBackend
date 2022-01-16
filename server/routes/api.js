"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var express = require("express");
var status = require("http-status");
var middleware_1 = require("../services/middleware");
var auth_1 = require("./auth");
var user_1 = require("./user");
var middleware = new middleware_1.Middleware();
exports.api = express.Router();
exports.api.use(middleware.jwtDecoder);
exports.api.use('/auth', auth_1.authRouter);
exports.api.use('/user', new user_1.UserRouter().router);
exports.api.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
});
//# sourceMappingURL=api.js.map