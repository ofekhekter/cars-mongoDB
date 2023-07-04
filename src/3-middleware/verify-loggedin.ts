import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../2-utils/cyber";
import { UnauthorizedError } from "../4-models/Error-Model";

export const verifyLoggedIn = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const isValid = await verifyToken(req);
        if(!isValid) UnauthorizedError("Invalid token!");
        next();
    }
    catch(err){
        next(err);
    }
}