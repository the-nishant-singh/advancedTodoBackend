"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var AuthRouter = /** @class */ (function () {
    function AuthRouter() {
        this.router = express.Router();
        this.router.post('/register', routes_1.AuthRoutes.register);
        this.router.post('/login', routes_1.AuthRoutes.login);
        this.router.post('/send-reset-email', routes_1.AuthRoutes.sendResetEmail);
    }
    return AuthRouter;
}());
exports.authRouter = new AuthRouter().router;
//# sourceMappingURL=index.js.map