"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    firebaseUid: {
        type: String,
        required: true
    },
    hasPassword: {
        type: Boolean,
        default: false
    },
    roles: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
exports.UserSchema.virtual('fullName').get(function () {
    return "".concat(this.name.first, " ").concat(this.name.last);
});
exports.UserSchema.index({
    email: "text",
    "name.first": "text",
    "name.last": "text",
});
//# sourceMappingURL=user.js.map