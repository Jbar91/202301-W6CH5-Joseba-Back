import { Router } from 'express';
import { CarsController } from '../controllers/cars/cars.controller.js';
import { authentication } from '../interceptors/authentication.js';
import { authorization } from '../interceptors/authorization.js';
import { CarsMongoRepo } from '../repository/cars/cars.mongo.repo.js';
import { UsersMongoRepo } from '../repository/users/users.mongo.repo.js';

export const carsRouter = Router();
const carsRepo = new CarsMongoRepo();
const usersRepo = new UsersMongoRepo();
const controller = new CarsController(carsRepo, usersRepo);

carsRouter.get('/', authentication, controller.getAll.bind(controller));
carsRouter.get('/:id', authentication, controller.get.bind(controller));
carsRouter.post('/', authentication, controller.post.bind(controller));
carsRouter.patch(
  '/:id',
  authentication,
  authorization,
  controller.patch.bind(controller)
);
carsRouter.delete(
  '/:id',
  authentication,
  authorization,
  controller.delete.bind(controller)
);
