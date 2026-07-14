import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = Router();

router.post(
  '/',
  auth('buyer', 'seller', 'admin'),
  validateRequest(ReviewValidation.addReviewValidationSchema),
  ReviewController.addReview
);

router.get('/:propertyId', ReviewController.getReviews);

router.delete('/:id', auth('buyer', 'seller', 'admin'), ReviewController.deleteReview);

export const ReviewRoutes = router;
