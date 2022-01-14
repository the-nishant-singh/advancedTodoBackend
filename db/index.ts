import * as mongoose from 'mongoose';
import { UserSchema } from './user';
import { config } from '../config'
const PATH = config.DB_PATH || 'mongodb://localhost:27017/boilerplate';

mongoose.connect(PATH);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => console.log('connected to db ', PATH));


export const User = mongoose.model('User', UserSchema);