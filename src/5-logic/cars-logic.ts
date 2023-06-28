import { getAllCars } from "../2-utils/dal";
import { CarType } from "../4-models/Car-Model";
import { NotModifiedError, ResourceNotFoundError } from "../4-models/Error-Model";
import { collections } from "../2-utils/database.service";


export const getAllCarsLogic = async (): Promise<CarType[]> => {
    const cars = await getAllCars();
    return cars;
}

export const getOneCarLogic = async (id): Promise<CarType> => {
    const car = await collections.cars.findOne(id) as unknown as CarType;
    if(!car) ResourceNotFoundError(id);
    return car;
}

export const setOneCarLogic = async (newCar: CarType): Promise<CarType> => {
    const insertedCar = await collections.cars.insertOne(newCar) as unknown as CarType;
    return insertedCar;
}

export const updateCarLogic = async (updateCar: CarType, id): Promise<CarType> => {
    const result = await collections.cars.updateOne(id, { $set: updateCar });
    result ? console.log(`Successfully updated game with id ${id}`) : NotModifiedError(id);
    return updateCar;
}

export const deleteCarLogic = async (id): Promise<void> => {
    const result = await collections.cars.deleteOne(id);
    if(!result) ResourceNotFoundError(id);
}