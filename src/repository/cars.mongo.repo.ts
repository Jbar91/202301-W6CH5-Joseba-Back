import { HTTPError } from '../interfaces/errors.js';
import { Car } from '../entities/cars.js';
import { Repo } from './repository.interface.js';
import { CarModel } from './cars.mongo.models.js';
import createDebug from 'debug';

const debug = createDebug('CP:repo');

export class CarsMongoRepo implements Repo<Car> {
  async query(): Promise<Car[]> {
    debug('query method');
    const data = await CarModel.find();
    return data;
  }
  async queryId(id: string): Promise<Car> {
    debug('queryId method');
    const data = await CarModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }
  async create(info: Partial<Car>): Promise<Car> {
    debug('create method');
    const data = await CarModel.create(info);
    return data;
  }
  async update(info: Partial<Car>): Promise<Car> {
    debug('update method');
    const data = await CarModel.findByIdAndUpdate(info._id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in update');
    return data;
  }
  async delete(id: string): Promise<void> {
    debug('delete method');
    const data = await CarModel.findByIdAndDelete(id);
    if (!data) throw new HTTPError(404, 'Delete not found', 'Id not possible');
  }
}
