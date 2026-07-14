import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await UserService.getUserProfileFromDB(userId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await UserService.updateUserRoleInDB(id, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User role updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

const getPlatformStats = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getPlatformStatsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Platform statistics retrieved successfully',
    data: result,
  });
});

export const UserController = {
  getUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getPlatformStats,
};
