import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { carsRouter } from './routers/cars.router.js';
import createDebug from 'debug';
import { CustomError } from './interfaces/errors.js';

const debug = createDebug('CP: app');

export const app = express();

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.disable('x-powered-by');

app.use('/cars', carsRouter);

app.get('/', (_req, resp) => {
  resp.json({
    info: "Nice car's API",
    endpoints: {
      cars: '/cars',
    },
  });
});

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Soy un middleware de errores');
    const status = error.statusCode || 500;
    const statusMsg = error.statusMsg || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMsg,
        },
      ],
    });
    debug(status, statusMsg, error.message);
  }
);
