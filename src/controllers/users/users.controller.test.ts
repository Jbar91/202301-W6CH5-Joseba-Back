import { Response, Request, NextFunction } from 'express';
import { UsersMongoRepo } from '../../repository/users/users.mongo.repo.js';
import { Auth } from '../../helpers/auth.js';
import { UsersController } from './users.controller.js';

describe('Given UsersController', () => {
  const repo: UsersMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    search: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  let req = {} as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new UsersController(repo);

  beforeEach(() => {
    req = {
      body: {
        email: 'pepe',
        passwd: 'some',
      },
    } as unknown as Request;
  });

  describe('When register is used', () => {
    test("Then if there's no email or password it should throw an error", async () => {
      req.body.email = null;
      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if all fields are correct it should create a new user', async () => {
      // (controller.register as jest.Mock).mockResolvedValue;
      Auth.hash = await jest.fn().mockResolvedValue('some');
      expect(resp.json).toHaveBeenCalled();
    });
  });
});
