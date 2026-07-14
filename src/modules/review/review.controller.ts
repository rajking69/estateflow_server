import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewService } from './review.service';

const addReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await ReviewService.addReviewIntoDB({
    ...req.body,
    userId,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const { propertyId } = req.params;
  const result = await ReviewService.getReviewsFromDB(propertyId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const role = req.user?.role;

  await ReviewService.deleteReviewFromDB(id as string, userId as string, role as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review deleted successfully',
    data: null,
  });
});

export const ReviewController = {
  addReview,
  getReviews,
  deleteReview,
};
