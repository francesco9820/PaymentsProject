import { Router } from 'express';

import asyncMiddleware from '../../middlewares/asyncMiddleware';

import authenticate from './authenticate';

const user = Router();

user.post('/authenticate', asyncMiddleware(authenticate));

export default user;