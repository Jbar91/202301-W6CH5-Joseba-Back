import { Router } from 'express';
import { CarsController } from '../controllers/cars.controller.js';
import { CarsFileRepo } from '../repository/cars.file.repo.js';

export const carsRouter = Router();
const repo = new CarsFileRepo();
const controller = new CarsController(repo);

carsRouter.get('/', controller.getAll.bind(controller));
carsRouter.get('/:id', controller.get.bind(controller));
carsRouter.post('/', controller.post.bind(controller));
carsRouter.patch('/:id', controller.patch.bind(controller));
carsRouter.delete('/:id', controller.delete.bind(controller));
