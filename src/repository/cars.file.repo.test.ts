import fs from 'fs/promises';
import { CarsFileRepo } from './cars.file.repo';
import { Car } from '../models/cars';

jest.mock('fs/promises');

describe('Given ThingsFileRepo', () => {
  const repo = new CarsFileRepo();

  test('Then it should be instantiated', () => {
    expect(repo).toBeInstanceOf(CarsFileRepo);
  });
  describe('When read is called', () => {
    test('Then it should return the data', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.read();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('When readById is used', () => {
    test('Then it should return a value if it has a valid ID', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": 1}]');
      const id = 1;
      const result = await repo.readById(id);
      expect(result).toEqual({ id: 1 });
    });
    test('Then it should throw an error if it has an invalid ID', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const id = 2;

      expect(() => repo.readById(id)).rejects.toThrowError();
    });
  });
  describe('When write is called', () => {
    test('Then it should return the body', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const body: Car = {
        id: 1,
        brand: 'some',
        color: 'blue',
        model: 'qlq',
      };
      const result = await repo.write(body);
      expect(result).toEqual(body);
    });
  });
  describe('When update is called', () => {
    test('Then if the item exists it should modify it', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{"id": 1, "brand": "some", "color": "blue", "model": "qlq"}]'
      );

      const result = await repo.update(1, { brand: 'egg' });
      expect(result).toEqual([
        {
          id: 1,
          brand: 'egg',
          color: 'blue',
          model: 'qlq',
        },
      ]);
    });
    test("Then if item doesn't exists it should return the same item", async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{"id": 1, "brand": "some", "color": "blue", "model": "qlq"}]'
      );
      const result = await repo.update(3, {});
      expect(result).toEqual([
        {
          id: 1,
          brand: 'some',
          color: 'blue',
          model: 'qlq',
        },
      ]);
    });
  });
  describe('When delete is called', () => {
    test('Then it should delete selected item', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{"id": 1, "brand": "some", "color": "blue", "model": "qlq"}]'
      );
      const result = await repo.delete(1);
      expect(result).toEqual(undefined);
    });
  });
});
