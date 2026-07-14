import { Types } from 'mongoose';

export interface IReview {
  propertyId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
