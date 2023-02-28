import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { Car } from '../entities/cars.js';
import { Repo } from '../repository/repository.interface.js';

const debug = createDebug('CP:controller');

export class CarsController {
  constructor(public repo: Repo<Car>) {
    this.repo = repo;
    debug('Instantiated');
  }
  async getAll(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getAll method');
      const data = await this.repo.query();
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
  async get(req: Request, resp: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      debug('get method');
      const data = await this.repo.queryId(id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
  async post(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('post method');
      const data = await this.repo.create(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('patch method');
      const data = await this.repo.update(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('delete');
      const id = req.params.id;
      const data = await this.repo.delete(id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
}
