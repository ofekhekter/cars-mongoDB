import { DeleteResult, UpdateResult } from 'mongodb';
import { CarType } from '../4-models/Car-Model';
import { UserType } from '../4-models/UserModel';
import { collections } from './database.service';

export const getAllCars = async (): Promise<CarType[]> => {
    const cars = await collections.cars.find({}).toArray() as unknown as CarType[];
    return cars;
}

export const getOneCar = async (id: Object): Promise<CarType> => {
    const car = await collections.cars.findOne(id) as unknown as CarType;
    if (!car) {
        return null;
    }
    return car;
}

export const setOneCar = async (newCar: CarType): Promise<CarType> => {
    const car = await collections.cars.insertOne(newCar) as unknown as CarType;
    return car;
}

export const deleteCar = async (_id: Object): Promise<DeleteResult> => {
    const result = await collections.cars.deleteOne(_id);
    return result;
}

export const updateOneCar = async (id: Object, updateCar: CarType): Promise<UpdateResult<Document>> => {
    const result = await collections.cars.updateOne(id, { $set: updateCar });
    return result;
}

export const getAllUsers = async (): Promise<UserType[]> => {
    const users = await collections.users.find({}).toArray() as unknown as UserType[];
    if(users) return users;
    return [];
}

export const saveUser = async (user: UserType): Promise<void> => {
    collections.users.insertOne(user) as unknown as UserType;
}

export const updateUser = async (user: UserType): Promise<void> => {
    await collections.users.updateOne(
      { "_id": user._id },
      { $set: { "failedLoginAttempts": user.failedLoginAttempts } },
      { upsert: false }
    );
    await collections.users.updateOne(
        { "_id": user._id },
        { $set: { "blockedTime": user.blockedTime } },
        { upsert: false }
    );
    await collections.users.updateOne(
        { "_id": user._id },
        { $set: { "password": user.password } },
        { upsert: false }
    );
}