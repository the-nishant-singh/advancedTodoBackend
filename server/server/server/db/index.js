"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose = require("mongoose");
var user_1 = require("./user");
var config_1 = require("../config");
var PATH = config_1.config.DB_PATH || 'mongodb://localhost:27017/boilerplate';
mongoose.connect(PATH);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function () { return console.log('connected to db ', PATH); });
exports.User = mongoose.model('User', user_1.UserSchema);
//# sourceMappingURL=index.js.map