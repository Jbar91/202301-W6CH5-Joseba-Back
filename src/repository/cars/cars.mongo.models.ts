import { model, Schema } from 'mongoose';
import { Car } from '../../entities/cars.js';

const carSchema = new Schema<Car>({
  brand: {
    type: String,
    required: true,
  },
  modelCar: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

carSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const CarsModel = model('Car', carSchema, 'cars');
