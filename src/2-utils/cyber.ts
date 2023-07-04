import express, { Request, Response, NextFunction } from 'express';
import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CredentialsType, UserType } from "../4-models/UserModel";
import { UnauthorizedError } from "../4-models/Error-Model";
import { updateUser } from "./dal";

interface UserContainer {
    user: UserType;
}

export const generateHash = async (origPass: string): Promise<string> => {
    const password = origPass;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

const secret = "BackendForEver!!!";

export const getNewToken = (user: UserType): string => {

    const container: UserContainer = {user};

    const options = { expiresIn: '3h' };

    const token = jwt.sign(container, secret, options);

    return token;

}

export const verifyToken = (request: Request): Promise<boolean> => {
    
return new Promise<boolean>((resolve, reject) => {
    try{

    const header = request.header("authorization");

    if(!header){
        resolve(false);
        return;
    }

    const token = header.substring(7);


    if(!token){
        resolve(false);
        return;
    }

    jwt.verify(token, secret, (err) => {
        if(err){
            resolve(false);
            return;
        }

        resolve(true);
    });
}
    catch(err){
        reject(err);
    }
});
}

export const verifyAdmin = async (request: Request): Promise<boolean> => {

    const isLoggedIn = await verifyToken(request);

    if(!isLoggedIn) return false;

    const header = request.header("authorization");

    const token = header.substring(7);

    const container = jwt.decode(token) as UserContainer;

    const user = container.user;

    return user.role === "admin" ? true : false;

}

const isUserBlocked = (user: UserType): boolean => {
    const blockedTimelength = 1;
    let isBlocked = false;
    const currentDate = new Date();
    if (user.blockedTime !== null){
        let timeBlocked = currentDate.getTime() - user.blockedTime.getTime();
        timeBlocked = timeBlocked / 1000 / 60;
        if (timeBlocked <= blockedTimelength){
            isBlocked = true;
        }
        return isBlocked;
    }
}

export const verifyUser = async (user: UserType, credentials: CredentialsType, passwordMatches: boolean) => {
    const maxAttempts = 3;
    
    if (passwordMatches){
        if(isUserBlocked(user)) UnauthorizedError('User Blocked');
        else{
            user.failedLoginAttempts = 0;
            user.blockedTime = null;
            updateUser(user);
            const token = getNewToken(user);
            return token;
        }
    }else{
        if(isUserBlocked(user)){
            user.blockedTime = new Date(); // BAN HIM
            updateUser(user);
            UnauthorizedError('User Blocked');
        }else{
            if(user.failedLoginAttempts >= maxAttempts-1){ // if enter wrong password 5 times.
                user.blockedTime = new Date(); // BAN HIM
                updateUser(user);
                UnauthorizedError('User Blocked');
            }else{
                user.failedLoginAttempts = user.failedLoginAttempts + 1;
                updateUser(user);
                UnauthorizedError('Incorrect username or password');
            }
        }
    }
}