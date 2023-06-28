import { Request, Response, NextFunction } from 'express';


export const deleteMessage = (req: Request, res: Response, nextFunc: NextFunction) => {
    console.log("Trying to delete a book!");
    nextFunc();
}