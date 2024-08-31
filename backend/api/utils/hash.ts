import crypto from 'crypto';

export default (plain: string, algo?: string) => crypto.createHash(algo || 'sha1').update(plain).digest('hex');