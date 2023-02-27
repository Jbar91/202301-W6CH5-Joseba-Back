import { Response, Request, NextFunction } from 'express';
import { CarsFileRepo } from '../repository/cars.file.repo';
import { CarsController } from './cars.controller';

describe('Given ThingsController', () => {
  const repo: CarsFileRepo = {
    write: jest.fn(),
    read: jest.fn(),
    readById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new CarsController(repo);

  describe('when we use getAll', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.read).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.read as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.read).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use get', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.get(req, resp, next);
      expect(repo.readById).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.readById as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);
      expect(repo.readById).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use post', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.post(req, resp, next);
      expect(repo.write).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.write as jest.Mock).mockRejectedValue(new Error());
      await controller.post(req, resp, next);
      expect(repo.write).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use patch', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.update as jest.Mock).mockRejectedValue(new Error());
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use delete', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', () => {});
  });
});
