import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { PropertyController } from './property.controller';
import { PropertyValidation } from './property.validation';

const router = Router();

router.post(
  '/',
  auth('seller', 'admin'),
  validateRequest(PropertyValidation.createPropertyValidationSchema),
  PropertyController.createProperty
);

router.get('/', PropertyController.getAllProperties);

router.get('/:id', PropertyController.getPropertyDetails);

router.put(
  '/:id',
  auth('seller', 'admin'),
  validateRequest(PropertyValidation.updatePropertyValidationSchema),
  PropertyController.updateProperty
);

router.delete('/:id', auth('seller', 'admin'), PropertyController.deleteProperty);

export const PropertyRoutes = router;
