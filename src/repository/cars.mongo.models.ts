import { model, Schema } from 'mongoose';
import { Car } from '../entities/cars';

const thingSchema = new Schema<Car>({
  brand: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

export const CarModel = model('Car', thingSchema, 'cars');
