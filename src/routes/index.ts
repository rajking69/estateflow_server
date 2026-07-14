import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { PropertyRoutes } from '../modules/property/property.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/properties',
    route: PropertyRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
