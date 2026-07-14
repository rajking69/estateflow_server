import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PropertyService } from './property.service';

const createProperty = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await PropertyService.createPropertyIntoDB({
    ...req.body,
    createdBy: userId,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Property created successfully',
    data: result,
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const { meta, data } = await PropertyService.getAllPropertiesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Properties retrieved successfully',
    meta,
    data,
  });
});

const getPropertyDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PropertyService.getPropertyDetailsFromDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Property details retrieved successfully',
    data: result,
  });
});

const deleteProperty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const role = req.user?.role;

  await PropertyService.deletePropertyFromDB(id as string, userId as string, role as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Property deleted successfully',
    data: null,
  });
});

const updateProperty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const role = req.user?.role;

  const result = await PropertyService.updatePropertyInDB(
    id as string,
    req.body,
    userId as string,
    role as string
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Property updated successfully',
    data: result,
  });
});

export const PropertyController = {
  createProperty,
  getAllProperties,
  getPropertyDetails,
  deleteProperty,
  updateProperty,
};
