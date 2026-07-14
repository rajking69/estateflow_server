import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

router.get(
  '/me',
  auth('buyer', 'seller', 'admin'),
  UserController.getUserProfile
);

router.get(
  '/',
  auth('admin'),
  UserController.getAllUsers
);

router.get(
  '/stats',
  auth('admin'),
  UserController.getPlatformStats
);

router.patch(
  '/:id/role',
  auth('admin'),
  UserController.updateUserRole
);

router.delete(
  '/:id',
  auth('admin'),
  UserController.deleteUser
);

export const UserRoutes = router;
