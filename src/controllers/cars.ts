import { Request, Response } from 'express';
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
  post(req: Request, resp: Response) {}
  patch(req: Request, resp: Response) {}
  delete(req: Request, resp: Response) {}
}
