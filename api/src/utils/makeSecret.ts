import { Request } from 'express';

import hash from './hash';

const makeSecret = (req: Request) => hash((process.env.SECRET || 'secret') + req.ip);

export default makeSecret;