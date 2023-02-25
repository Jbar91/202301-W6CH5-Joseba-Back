import fs from 'fs/promises';
import { Car } from '../models/cars';
import { response } from 'express';
const file = './data/data.json';

export class CarsFileRepo {
  read(): Promise<Car[]> {
    return fs.readFile(file, 'utf-8').then((data) => JSON.parse(data));
  }

  readById(id: Car['id']): Promise<Car | undefined> {
    if (!id) response.send('<p>Error Item not found</p>');

    const car = fs.readFile(file, 'utf-8').then((data) => {
      const parsed = JSON.parse(data) as Car[];
      const found = parsed.find((item) => item.id === id);
      return found;
    });
    return car;
  }

  write(body: Car): Promise<Car[]> {
    const data = fs.readFile(file, 'utf-8').then((data) => {
      const parsed = JSON.parse(data) as Car[];
      const updated = [...parsed, body];
      fs.writeFile(file, JSON.stringify(updated));
      return updated;
    });

    return data;
  }
  async update(id: number, newData: any) {
    const data = await fs.readFile(file, 'utf-8');
    const parseJSON = JSON.parse(data);
    const updatedData = parseJSON.map((item: { id: number }) => {
      if (item.id === id) {
        return { ...item, ...newData };
      }
      return item;
    });
    const finalFile = JSON.stringify(updatedData);
    await fs.writeFile(file, finalFile, 'utf-8');
  }
  delete(id: Car['id']) {
    const data = fs.readFile(file, 'utf-8').then((data) => {
      const parsed = JSON.parse(data) as Car[];
      const deleted = parsed.filter((item) => item.id !== id);
      fs.writeFile(file, JSON.stringify(deleted));
      return deleted;
    });
    return data;
  }
}
