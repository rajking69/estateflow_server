import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

export const auth = (...roles: string[]) => {
  return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    // 1. Get token from cookies or Authorization header
    let token = req.cookies?.accessToken;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. If token is missing, throw error
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    // 3. Verify token signature
    const jwtSecret = config.jwt.secret;
    if (!jwtSecret) {
      throw new AppError(500, 'JWT Secret is not configured');
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (error) {
      throw new AppError(401, 'Invalid or expired token!');
    }

    const { userId, role } = decoded;

    // 4. Verify user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, 'This user is not found!');
    }

    // 5. Authorize based on roles
    if (roles.length > 0 && !roles.includes(role)) {
      throw new AppError(403, 'You do not have permission to perform this action!');
    }

    // 6. Bind user context to request
    req.user = decoded;
    next();
  });
};
