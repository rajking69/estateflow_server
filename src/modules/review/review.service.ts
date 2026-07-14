import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import { Property } from '../property/property.model';
import { IReview } from './review.interface';
import { Review } from './review.model';

const calculateAverageRating = async (propertyId: string) => {
  const stats = await Review.aggregate([
    { $match: { propertyId: new mongoose.Types.ObjectId(propertyId) } },
    {
      $group: {
        _id: '$propertyId',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  const newRating = stats.length > 0 ? Math.round(stats[0].averageRating * 10) / 10 : 0;
  await Property.findByIdAndUpdate(propertyId, { rating: newRating });
};

const addReviewIntoDB = async (payload: IReview) => {
  const property = await Property.findById(payload.propertyId);
  if (!property) {
    throw new AppError(404, 'Property not found');
  }

  // Prevent multiple reviews from the same user on the same property
  const existingReview = await Review.findOne({
    propertyId: payload.propertyId,
    userId: payload.userId,
  });
  if (existingReview) {
    throw new AppError(400, 'You have already reviewed this property');
  }

  const result = await Review.create(payload);
  await calculateAverageRating(payload.propertyId.toString());
  return result;
};

const getReviewsFromDB = async (propertyId: string) => {
  const result = await Review.find({ propertyId })
    .populate('userId', 'name email role')
    .sort('-createdAt');
  return result;
};

const deleteReviewFromDB = async (id: string, userId: string, role: string) => {
  const review = await Review.findById(id);
  if (!review) {
    throw new AppError(404, 'Review not found');
  }

  // Only the creator of the review or an admin can delete it
  if (role !== 'admin' && review.userId.toString() !== userId) {
    throw new AppError(403, 'You do not have permission to delete this review');
  }

  const result = await Review.findByIdAndDelete(id);
  await calculateAverageRating(review.propertyId.toString());
  return result;
};

export const ReviewService = {
  addReviewIntoDB,
  getReviewsFromDB,
  deleteReviewFromDB,
  calculateAverageRating,
};
