import { Request, Response, NextFunction } from 'express';
import { CarsFileRepo } from '../repository/cars.file.repo.js';

export class CarsController {
  constructor(public repo: CarsFileRepo) {
    this.repo = repo;
  }
  async getAll(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.read();
      resp.json(data);
    } catch (error) {
      next(error);
    }
  }
  async get(req: Request, resp: Response, next: NextFunction) {
    const id = Number(req.params.id);
    try {
      const data = await this.repo.readById(id);
      resp.json(data);
    } catch (error) {
      next(error);
    }
  }
  async post(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.write(req.body);
      resp.json(data);
    } catch (error) {
      next(error);
    }
  }
  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = await this.repo.update(id, req.body);
      resp.json(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = await this.repo.delete(id);
      resp.json(data);
    } catch (error) {
      next(error);
    }
  }
}
