import { Router } from 'express';

import asyncMiddleware from '../../middlewares/asyncMiddleware';
import requiresAuth from '../../middlewares/requiresAuth';

import list from './list';
import create from './create';
import get from './get';
import cancel from './cancel';

const subscription = Router();

subscription.get('', asyncMiddleware(requiresAuth), asyncMiddleware(list));
subscription.get('/:id', asyncMiddleware(requiresAuth), asyncMiddleware(get));
subscription.post('', asyncMiddleware(requiresAuth), asyncMiddleware(create));
subscription.put('/:id', asyncMiddleware(requiresAuth), asyncMiddleware(cancel));

export default subscription;