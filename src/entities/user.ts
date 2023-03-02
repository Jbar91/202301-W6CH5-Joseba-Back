import { Car } from './cars';

export type User = {
  id: string;
  email: string;
  passwd: string;
  cars: Car[];
};
