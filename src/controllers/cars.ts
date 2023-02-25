import { Request, Response } from 'express';
import { Car } from '../models/cars.js';
import { CarsFileRepo } from '../repo/cars.file.repo.js';

export class CarsController {
  constructor(public repo: CarsFileRepo) {
    this.repo = repo;
  }
  getAll(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }
  get(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      const id = req.params.id;
      const car = data.find((item) => item.id === Number(id));
      resp.json(car);
    });
  }
  post(req: Request, resp: Response) {
    this.repo.write().then((data) => {
      const newCar: Car = req.body;
      const updated = [...data, newCar];
      resp.json(updated);
    });
  }
  patch(req: Request, resp: Response) {}
  delete(req: Request, resp: Response) {}
}
