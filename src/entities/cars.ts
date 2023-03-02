import { User } from './user';

export type Car = {
  id: string;
  brand: string;
  modelCar: string;
  color: string;
  owner: User;
};

/** Relaciones entre colleciones
 *
 * 1 - n  User -> n // Cosa -> 1
 * n - m  User -> n // Cosa -> n
 *
 */
