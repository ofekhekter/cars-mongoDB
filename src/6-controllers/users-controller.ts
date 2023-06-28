import express, { Request, Response, NextFunction } from 'express';
import { CredentialsType, UserType, validateCredentials } from '../4-models/UserModel';
import { loginUser, registerUser } from '../5-logic/users-logic';

const router = express.Router();

router.post('/auth/register', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body as UserType;
        const token = await registerUser(user);
        res.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    } 
});

router.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const credentials = req.body as CredentialsType;
        validateCredentials(credentials);
        const token = await loginUser(credentials);
        res.status(200).json(token);
    }
    catch(err: any){
        next(err);
    }
})

export default router;