import joi from "joi";
import { ValidationError } from "./Error-Model";
import { ObjectId } from "mongodb";

export type RolesType = "user" | "admin";

export type CredentialsType = {
    username: string;
    password: string;
}

export type UserType = {
    _id:  ObjectId;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    role: RolesType;
    failedLoginAttempts: number;
    blockedTime: Date;
}

export const CredentialsValidationSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
})

export const validateCredentials = (credentials: CredentialsType) => {
    const result = CredentialsValidationSchema.validate(credentials);
    if (result.error) ValidationError(result.error.message);
}

export const userValidationSchema = joi.object({
    firstname: joi.string().required().min(2).max(10),
    lastname: joi.string().required().min(2).max(15),
    username: joi.string().required().min(2).max(20),
    password: joi.string().required().min(8).max(32).regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/),
    role: joi.forbidden(),
    failedLoginAttempts: joi.number().optional(),
    blockedTime: joi.optional()
})

export const validateUser = (user: UserType) => {
    const result = userValidationSchema.validate(user);
    if (result.error) ValidationError(result.error.message);
}