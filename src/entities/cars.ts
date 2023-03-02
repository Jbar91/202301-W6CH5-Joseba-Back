import { User } from './user';

export type Car = {
  id: string;
  brand: string;
  modelCar: string;
  color: string;
  owner: User;
};
