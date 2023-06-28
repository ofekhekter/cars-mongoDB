import  jwt  from "jsonwebtoken";
import { UserType } from "../4-models/UserModel";
import { Request } from "express";

interface UserContainer {
    user: UserType;
}

const secret = "Wooow";

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