import express, { Router } from 'express';

import user from './user';
import subscription from './subscription';

const handlers = Router();

handlers.use(express.urlencoded({ extended: false, limit: '5mb' }));
handlers.use(express.json({ type: ['application/json', 'application/*+json'] }));

handlers.use('/user', user);
handlers.use('/subscription', subscription);

export default handlers;
