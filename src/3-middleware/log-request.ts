import { Request, Response, NextFunction } from "express";

export const loggedRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request method: ${req.method}, Request route: ${req.originalUrl}`)
    next();
}