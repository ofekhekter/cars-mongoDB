import express, { Request, Response, NextFunction } from 'express';
import { deleteCarLogic, getAllCarsLogic, getOneCarLogic, setOneCarLogic, updateCarLogic } from '../5-logic/cars-logic';
import { CarType, validateCar } from '../4-models/Car-Model';
import { deleteMessage } from '../3-middleware/delete-message';
import { ObjectId } from 'mongodb';
import { verifyLoggedIn } from '../3-middleware/verify-loggedin';
import { verifyAdminMW } from '../3-middleware/verify-admin';

const router = express.Router();

router.get('/cars', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const cars: CarType[] = await getAllCarsLogic();
        res.status(200).send(cars);
    } catch (err) {
        next(err);
    }
});

router.get('/cars/:id',verifyLoggedIn , async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try{
        const query = { _id: new ObjectId(id) };
        const car: CarType = await getOneCarLogic(query);
        res.status(200).send(car);
    } catch (err) {
        next(err);
    }
});

router.post('/cars',verifyLoggedIn , async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newCar: CarType = req.body;
        validateCar(newCar);
        const addedCar: CarType = await setOneCarLogic(newCar);
        res.status(201).send(addedCar);
    } catch (err) {
        next(err);
    }
});

router.put('/cars/:id',verifyLoggedIn , async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try{
        const replaceCar: CarType = req.body as CarType;
        validateCar(replaceCar);
        const query = { _id: new ObjectId(id) };
        const msg = await updateCarLogic(query, replaceCar);
        res.status(201).send(msg);
    } catch (err) {
        next(err);
    }
});

router.delete('/cars/:id',[deleteMessage, verifyAdminMW] , async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try{
        const query = { _id: new ObjectId(id) };
        const msg = await deleteCarLogic(query);
        res.status(200).send(msg);
    } catch (err) {
        next(err);
    }
});

export default router;