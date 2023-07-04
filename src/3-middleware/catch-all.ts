import { Request, Response, NextFunction } from 'express';
import { logger } from '../2-utils/logger';

export const catchAll = (err: any, req: Request, res: Response, nextFunc: NextFunction) => {
  console.log(err);
  logger(err.message);
  res.status(err.status).send(err.message);
}