import { Router } from 'express';

import asyncMiddleware from '../../middlewares/asyncMiddleware';
import requiresAuth from '../../middlewares/requiresAuth';

import list from './list';

const subscription = Router();

subscription.get('', asyncMiddleware(requiresAuth()), asyncMiddleware(list));
// subscription.get('', asyncMiddleware(list));

export default subscription;