import { CarsModel } from './cars.mongo.models.js';
import { HTTPError } from '../../interfaces/errors.js';
import { Car } from '../../entities/cars.js';
import { Repo } from '../repository.interface.js';

import createDebug from 'debug';

const debug = createDebug('CP:repo');

export class CarsMongoRepo implements Repo<Car> {
  async query(): Promise<Car[]> {
    debug('query method');
    const data = await CarsModel.find();
    return data;
  }
  async queryId(id: string): Promise<Car> {
    debug('queryId method');
    const data = await CarsModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }
  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = await CarsModel.find({ [query.key]: query.value });
    return data;
  }
  async create(info: Partial<Car>): Promise<Car> {
    debug('create method');
    const data = await CarsModel.create(info);
    return data;
  }
  async update(info: Partial<Car>): Promise<Car> {
    debug('update method');
    const data = await CarsModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in update');
    return data;
  }
  async delete(id: string): Promise<void> {
    debug('delete method');
    const data = await CarsModel.findByIdAndDelete(id);
    if (!data) throw new HTTPError(404, 'Delete not found', 'Id not possible');
  }
}
