import { Request, Response } from 'express';
import { CarsFileRepo } from '../repository/cars.file.repo.js';

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
    const id = Number(req.params.id);

    this.repo.readById(id).then((data) => {
      resp.json(data);
    });
  }
  post(req: Request, resp: Response) {
    this.repo.write(req.body).then((data) => {
      resp.json(data);
    });
  }
  patch(req: Request, resp: Response) {
    const id = Number(req.params.id);
    this.repo.update(id, req.body).then((data) => resp.json(data));
  }
  delete(req: Request, resp: Response) {
    const id = Number(req.params.id);
    this.repo.delete(id).then((data) => resp.json(data));
  }
}
