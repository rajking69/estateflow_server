import { Types } from 'mongoose';

export interface IProperty {
  title: string;
  shortDescription: string;
  description: string;
  propertyType: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  rating?: number;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
