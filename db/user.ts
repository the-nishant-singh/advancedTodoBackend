import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
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
    enum : ['Admin', 'User'],
    default: 'User'
  },
},  {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

UserSchema.virtual('fullName').get(function () {
  return `${this.name.first} ${this.name.last}`;
});

UserSchema.index({
  email: "text",
  "name.first": "text",
  "name.last": "text",
});