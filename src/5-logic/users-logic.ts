import { getNewToken } from "../2-utils/cyber";
import { getAllUsers, saveUser } from "../2-utils/dal";
import { UnauthorizedError, UserExistError } from "../4-models/Error-Model";
import { CredentialsType, UserType, validateUser } from "../4-models/UserModel";

export const registerUser = async (user: UserType): Promise<string> => {

    const users = await getAllUsers();

    validateUser(user);

    user.role = 'user';
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

    const users = await getAllUsers();

    const user = users.find(user => user.username === credentials.username && user.password === credentials.password);

    if (!user) UnauthorizedError('Incorrect username or password');

    const token = getNewToken(user);

    return token;

}