import joi from "joi";
import { ValidationError } from "./Error-Model";
import { UploadedFile } from "express-fileupload";

export type CarType = {
    id: number;
    brand: string;
    model: string;
    car_body: string;
    color: string;
    price: string;
    year: number;
}

export const carValidationSchema = joi.object({
    id: joi.number().optional().positive().integer(),
    brand: joi.string().required().min(2).max(15),
    model: joi.string().required().min(1).max(15),
    car_body: joi.string().required(),
    color: joi.string().required(),
    price: joi.string().required().regex(/$/),
    year: joi.number().required().min(1980).max(2023),
});

export const validateCar = (car: CarType) => {
    const result = carValidationSchema.validate(car);
    if (result.error) ValidationError(result.error.message);
}