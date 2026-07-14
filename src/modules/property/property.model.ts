import { Schema, model } from 'mongoose';
import { IProperty } from './property.interface';

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    propertyType: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    area: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export const Property = model<IProperty>('Property', propertySchema);
