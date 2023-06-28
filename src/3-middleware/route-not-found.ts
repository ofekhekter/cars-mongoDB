import { Request, Response, NextFunction } from 'express';
import { RouteNotFoundError } from '../4-models/Error-Model';


export const routeNotFound = (req: Request, res: Response, nextFunc: NextFunction) => {
    const err = RouteNotFoundError(req.originalUrl);
    nextFunc(err);
}