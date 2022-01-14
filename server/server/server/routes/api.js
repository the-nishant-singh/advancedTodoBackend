"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var express = require("express");
var status = require("http-status");
var auth_1 = require("./auth");
exports.api = express.Router();
exports.api.use('/auth', auth_1.authRouter);
exports.api.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
});
//# sourceMappingURL=api.js.map