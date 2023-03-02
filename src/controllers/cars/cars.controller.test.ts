import { Response, Request } from 'express';
import { RequestCool } from '../../interceptors/authentication.js';
import { CarsMongoRepo } from '../../repository/cars/cars.mongo.repo.js';
import { UsersMongoRepo } from '../../repository/users/users.mongo.repo.js';

import { CarsController } from './cars.controller.js';

describe('Given ThingsController', () => {
  const repo: CarsMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    search: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const usersRepo: UsersMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    search: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '' },
    info: {},
  } as unknown as RequestCool;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new CarsController(repo, usersRepo);

  describe('when we use getAll', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use get', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use post', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      req.info = {
        email: 'some',
        id: '1',
        role: 'user',
        cars: [],
      };
      await controller.post(req, resp, next);
      (usersRepo.queryId as jest.Mock).mockResolvedValue({
        email: 'some',
        id: '1',
        role: 'user',
        cars: [],
      });

      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should update the user if all is ok', async () => {
      req.info = {
        email: 'some',
        id: '1',
        role: 'user',
        cars: [],
      };
      await controller.post(req, resp, next);
      (usersRepo.update as jest.Mock).mockResolvedValue({
        email: 'some',
        id: '1',
        role: 'user',
        cars: [2],
      });
      expect(usersRepo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should call next if there`s id', async () => {
      req.info = {
        id: '',
        email: '',
        role: '',
        cars: [],
      };
      await controller.post(req, resp, next);
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
      req.params.id = '2';
      await controller.delete(req, resp, next);
      (repo.delete as jest.Mock).mockResolvedValue([2]);

      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      req.params.id = '';
      await controller.delete(req, resp, next);
      (repo.delete as jest.Mock).mockRejectedValue(new Error());
      expect(next).toHaveBeenCalled();
    });
  });
});
