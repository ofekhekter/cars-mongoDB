import { Request, Response, NextFunction } from 'express';
import { verifyAdmin } from '../2-utils/cyber';
import { UnauthorizedError } from '../4-models/Error-Model';

export const verifyAdminMW = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin) UnauthorizedError("You are not allowed! only admins can get access.");
        next();
    } catch(err){
        next(err);
    }
}