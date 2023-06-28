import express from 'express';
import usersController from './6-controllers/users-controller';
import carsController from './6-controllers/cars-controller'
import { loggedRequest } from './3-middleware/log-request';
import { catchAll } from './3-middleware/catch-all';
import { routeNotFound } from './3-middleware/route-not-found';
import { connectToDatabase } from "./2-utils/database.service";

const server = express();

server.use(express.json());

server.use(loggedRequest);

server.use('/api', usersController);
server.use('/api', carsController);
connectToDatabase();

server.use('/*', routeNotFound);

server.use(catchAll);

server.listen(3001, () => console.log('Listening on http://localhost:3001'));