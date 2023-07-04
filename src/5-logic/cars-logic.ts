import { deleteCar, getAllCars, getOneCar, setOneCar, updateOneCar } from "../2-utils/dal";
import { CarType, validateCar } from "../4-models/Car-Model";
import { NotModifiedError, ResourceNotFoundError} from "../4-models/Error-Model";


export const getAllCarsLogic = async (): Promise<CarType[]> => {
    const cars = await getAllCars();
    return cars;
}

export const getOneCarLogic = async (_id: Object): Promise<CarType> => {
        const car = await getOneCar(_id);
        if(!car) ResourceNotFoundError("");
        return car;
}

export const setOneCarLogic = async (newCar: CarType): Promise<CarType> => {
    const insertedCar = await setOneCar(newCar);
    return insertedCar;
}

export const updateCarLogic = async (_id: Object, updateCar: CarType): Promise<string> => {
    const result = await updateOneCar(_id, updateCar);
    if (result.modifiedCount === 0) NotModifiedError("");
    return "The Update was successful!";
}

export const deleteCarLogic = async (_id: Object): Promise<string> => {
    const result = await deleteCar(_id);
    if(result.deletedCount === 0) ResourceNotFoundError("");
    return "The car has been deleted!";
}