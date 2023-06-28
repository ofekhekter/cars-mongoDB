import fsPromises from 'fs/promises';
import { CarType } from '../4-models/Car-Model';
import { UserType } from '../4-models/UserModel';
import { collections } from './database.service';

export const getAllCars = async (): Promise<CarType[]> => {
    const cars = (await collections.cars.find({}).toArray()) as unknown as CarType[];
    return cars;
}

export const getAllUsers = async (): Promise<UserType[]> => {
    const users = (await collections.users.find({}).toArray()) as unknown as UserType[];
    if(users) return users;
    return [];
}

export const saveUser = async (user: UserType): Promise<void> => {
    collections.users.insertOne(user) as unknown as UserType;
}