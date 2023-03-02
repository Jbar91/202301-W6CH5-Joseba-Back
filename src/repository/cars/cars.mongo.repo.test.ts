import { CarsModel } from './cars.mongo.models';
import { CarsMongoRepo } from './cars.mongo.repo';

jest.mock('./cars.mongo.models.js');

describe('Given CarMongoRepo', () => {
  const repo = new CarsMongoRepo();
  describe('When is called', () => {
    test('Then should be instanced', () => {
      expect(repo).toBeInstanceOf(CarsMongoRepo);
    });
  });

  describe('When i use query', () => {
    test('Then should return the datas', async () => {
      const mockData = [{ chars: 'test' }];
      (CarsModel.find as jest.Mock).mockImplementation(() => ({
        populate: jest.fn().mockReturnValue(mockData),
      }));

      const result = await repo.query();

      expect(CarsModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });
  });

  describe('When queryId is called', () => {
    test('Then if it has a valid id it should return the data', async () => {
      (CarsModel.findById as jest.Mock).mockResolvedValue({ id: '1' });

      const id = '1';
      const result = await repo.queryId(id);
      expect(CarsModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test("Then if id doesn't exists it should throw an error", () => {
      (CarsModel.findById as jest.Mock).mockResolvedValue(undefined);

      const id = '1';

      expect(async () => repo.queryId(id)).rejects.toThrow();
      expect(CarsModel.findById).toHaveBeenCalled();
    });
  });

  describe('When search is called', () => {
    test('Then it should do a query', async () => {
      const query = { key: 'some', value: 'otro' };

      (CarsModel.find as jest.Mock).mockResolvedValue([query]);
      const result = await repo.search({ key: 'some', value: 'otro' });

      expect(CarsModel.find).toHaveBeenCalled();
      expect(result).toEqual([query]);
    });
  });

  describe('When create is called', () => {
    test('Then it should return an object if we give a valid id', async () => {
      const mockData = { brand: 'toyota', modelCar: 'Yaris', color: 'black' };
      (CarsModel.create as jest.Mock).mockImplementation(() => ({
        populate: jest.fn().mockReturnValue(mockData),
      }));

      const result = await repo.create(mockData);

      expect(CarsModel.findById).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });
  });

  describe('When update is called', () => {
    test('Then it should return the updated object if it has the same id', async () => {
      (CarsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '1',
        brand: 'toyota',
        modelCar: 'Yaris',
        color: 'black',
      });
      const result = await repo.update({
        id: '1',
        brand: 'toyota',
        modelCar: 'Yaris',
        color: 'black',
      });
      expect(CarsModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual({
        id: '1',
        brand: 'toyota',
        modelCar: 'Yaris',
        color: 'black',
      });
    });
    describe('When the update is rejected', () => {
      test('Then it should throw an error', async () => {
        (CarsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(undefined);
        const mockCar = { id: '1', brand: 'suzuki' };
        expect(async () => repo.update(mockCar)).rejects.toThrow();
        expect(CarsModel.findByIdAndUpdate).toHaveBeenCalled();
      });
    });

    describe('When delete is called', () => {
      test('Then given an id it should delete an entry', async () => {
        (CarsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
          '[{"id": "1"}]'
        );
        const id = '1';
        const result = await repo.delete(id);
        expect(CarsModel.findByIdAndDelete).toHaveBeenCalled();
        expect(result).toBeUndefined();
      });
      test('Then given an incorrect id it should throw an id', () => {
        (CarsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);

        expect(async () => repo.delete('1')).rejects.toThrow();
        expect(CarsModel.findByIdAndDelete).toHaveBeenCalled();
      });
    });
  });
});
