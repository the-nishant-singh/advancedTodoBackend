"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var config_1 = require("./config");
var api_1 = require("./routes/api");
var app = express();
var port = config_1.config.PORT || '8000';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/health', function (req, res) {
    return res.json({ message: "server health ok" });
});
app.use('/api', api_1.api);
app.get('*', function (req, res) {
    res.json({ message: "Path Not Found" });
});
app.listen(port, function () { return console.log("Server up and running on port ".concat(port, " !")); });
//# sourceMappingURL=index.js.map