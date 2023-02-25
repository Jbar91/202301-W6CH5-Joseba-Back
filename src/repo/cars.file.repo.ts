import fs from 'fs/promises';
import { Car } from '../models/cars';
const file = './data/data.json';

export class CarsFileRepo {
  read(): Promise<Car[]> {
    return fs.readFile(file, 'utf-8').then((data) => JSON.parse(data));
  }
  write(): Promise<Car[]> {
    return fs.readFile(file, 'utf-8').then((data) => JSON.parse(data));
  }
  update() {}
  delete() {}
}
