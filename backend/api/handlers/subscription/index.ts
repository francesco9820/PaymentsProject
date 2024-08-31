import { Router } from 'express';

import asyncMiddleware from '../../middlewares/asyncMiddleware';
import requiresAuth from '../../middlewares/requiresAuth';

import list from './list';
import create from './create';

const subscription = Router();

subscription.get('', asyncMiddleware(requiresAuth), asyncMiddleware(list));
subscription.post('', asyncMiddleware(requiresAuth), asyncMiddleware(create));

export default subscription;