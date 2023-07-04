import { generateHash, getNewToken, verifyPassword, verifyUser } from "../2-utils/cyber";
import { getAllUsers, saveUser, updateUser } from "../2-utils/dal";
import { UserExistError } from "../4-models/Error-Model";
import { CredentialsType, UserType, validateCredentials, validateUser } from "../4-models/UserModel";


export const registerUser = async (user: UserType): Promise<string> => {
    validateUser(user);
    const users = await getAllUsers();
    user.role = 'user';
    user.failedLoginAttempts = 0;
    user.blockedTime = null;
    const hash = await generateHash(user.password);
    user.password = hash;
    if (users.length === 0) {
        await saveUser(user);
        const token = getNewToken(user);
        return token;
    } else {
        const userExist = users.findIndex(u => u.username === user.username);
        if (userExist !== -1) UserExistError('User already exists, please choose a different username');
        else {
            await saveUser(user);
            const token = getNewToken(user);
            return token;
        }
    }
}

export const loginUser = async (credentials: CredentialsType): Promise<string> => {
    
    validateCredentials(credentials);

    const users = await getAllUsers();

    const user = users.find(user => user.username === credentials.username);
    
    if (!user) UserExistError('Incorrect username or password');

    const passwordMatches = await verifyPassword(credentials.password, user.password);
    
    const token = await verifyUser(user, credentials, passwordMatches);

    return token;
    
}