import express, { Request, Response, NextFunction } from 'express';
import { deleteCarLogic, getAllCarsLogic, getOneCarLogic, setOneCarLogic, updateCarLogic } from '../5-logic/cars-logic';
import { CarType } from '../4-models/Car-Model';
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
    try{
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const car: CarType = await getOneCarLogic(query);
        res.json(car);
    } catch (err) {
        next(err);
    }
});

router.post('/cars',verifyLoggedIn , async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newCar: CarType = req.body;
        const addedCar: CarType = await setOneCarLogic(newCar);
        res.json(addedCar);
    } catch (err) {
        next(err);
    }
});

router.put('/cars/:id',verifyLoggedIn , async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req?.params?.id;
        const replaceCar: CarType = req.body as CarType;
        const query = { _id: new ObjectId(id) };
        const updatedCar: CarType = await updateCarLogic(replaceCar, query);
        res.json(updatedCar);
    } catch (err) {
        next(err);
    }
});

router.delete('/cars/:id',[deleteMessage, verifyAdminMW] , async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        await deleteCarLogic(query);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

export default router;