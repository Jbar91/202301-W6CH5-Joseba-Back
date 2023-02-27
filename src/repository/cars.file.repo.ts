import fs from 'fs/promises';
import { Car } from '../models/cars';
const file = './data/data.json';

export class CarsFileRepo {
  async read(): Promise<Car[]> {
    const data: string = await fs.readFile(file, 'utf-8');

    return JSON.parse(data);
  }

  async readById(id: Car['id']): Promise<Car> {
    const data = await fs.readFile(file, 'utf-8');
    const parsed: Car[] = JSON.parse(data);
    const found = parsed.find((item) => item.id === id);
    if (!found) throw new Error(`Item not found`);
    return found;
  }

  async write(body: Car): Promise<Car> {
    const data = await fs.readFile(file, 'utf-8');
    const parsed: Car[] = JSON.parse(data);
    const finalData = [...parsed, body];
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');

    return body;
  }
  async update(id: number, newData: Partial<Car>) {
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
    return updatedData;
  }
  async delete(id: Car['id']): Promise<void> {
    const data = await fs.readFile(file, 'utf-8');
    const parsed = JSON.parse(data) as Car[];
    const deleted = parsed.filter((item) => item.id !== id);
    fs.writeFile(file, JSON.stringify(deleted));
  }
}
