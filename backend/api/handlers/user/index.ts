import { Router } from 'express';

import asyncMiddleware from '../../middlewares/asyncMiddleware';

import register from './register';
import authenticate from './authenticate';

const user = Router();

user.post('/register-user', asyncMiddleware(register));
user.post('/authenticate', asyncMiddleware(authenticate));

export default user;