"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express.Router();
        this.router.post('/changePassword', routes_1.UserRoutes.changePassword);
        this.router.put('/update-profile', routes_1.UserRoutes.updateProfile);
    }
    return UserRouter;
}());
exports.UserRouter = UserRouter;
//# sourceMappingURL=index.js.map