import fs from 'fs/promises';
import { Car } from '../models/cars';
const file = './data/data.json';

export class CarsFileRepo {
  read() {
    return fs.readFile(file, 'utf-8').then((data) => JSON.parse(data) as Car[]);
  }
  write() {}
  update() {}
  delete() {}
}
