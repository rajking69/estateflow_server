import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const Review = model<IReview>('Review', reviewSchema);
