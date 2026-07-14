import { AppError } from '../../errors/AppError';
import { IProperty } from './property.interface';
import { Property } from './property.model';

const createPropertyIntoDB = async (payload: IProperty) => {
  const result = await Property.create(payload);
  return result;
};

const getAllPropertiesFromDB = async (query: Record<string, any>) => {
  const { search, propertyType, minPrice, maxPrice, sort, page = 1, limit = 10, createdBy } = query;

  const finalQuery: Record<string, any> = {};

  // 1. Search (title or location)
  if (search) {
    finalQuery.$or = [
      { title: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }

  // 2. Filter by property type
  if (propertyType) {
    finalQuery.propertyType = propertyType;
  }

  // Filter by creator/seller
  if (createdBy) {
    finalQuery.createdBy = createdBy;
  }

  // 3. Filter by price range
  const priceFilter: Record<string, any> = {};
  if (minPrice !== undefined) {
    priceFilter.$gte = Number(minPrice);
  }
  if (maxPrice !== undefined) {
    priceFilter.$lte = Number(maxPrice);
  }
  if (Object.keys(priceFilter).length > 0) {
    finalQuery.price = priceFilter;
  }

  // 4. Sort
  let sortBy = '-createdAt'; // Default: newest
  if (sort === 'oldest') {
    sortBy = 'createdAt';
  } else if (sort === 'lowest price') {
    sortBy = 'price';
  } else if (sort === 'highest price') {
    sortBy = '-price';
  }

  // 5. Pagination
  const pageNumber = Math.max(1, Number(page));
  const limitNumber = Math.max(1, Number(limit));
  const skip = (pageNumber - 1) * limitNumber;

  const data = await Property.find(finalQuery)
    .populate('createdBy', 'name email role')
    .sort(sortBy)
    .skip(skip)
    .limit(limitNumber);

  const total = await Property.countDocuments(finalQuery);
  const totalPages = Math.ceil(total / limitNumber);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages,
    },
    data,
  };
};

const getPropertyDetailsFromDB = async (id: string) => {
  const result = await Property.findById(id).populate('createdBy', 'name email role');
  if (!result) {
    throw new AppError(404, 'Property not found');
  }
  return result;
};

const deletePropertyFromDB = async (id: string, userId: string, role: string) => {
  const property = await Property.findById(id);
  if (!property) {
    throw new AppError(404, 'Property not found');
  }

  // Only the seller who created the property or an admin can delete it
  if (role !== 'admin' && property.createdBy.toString() !== userId) {
    throw new AppError(403, 'You do not have permission to delete this property');
  }

  const result = await Property.findByIdAndDelete(id);
  return result;
};

const updatePropertyInDB = async (
  id: string,
  payload: Partial<IProperty>,
  userId: string,
  role: string
) => {
  const property = await Property.findById(id);
  if (!property) {
    throw new AppError(404, 'Property not found');
  }

  // Only the seller who created the property or an admin can update it
  if (role !== 'admin' && property.createdBy.toString() !== userId) {
    throw new AppError(403, 'You do not have permission to update this property');
  }

  const result = await Property.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const PropertyService = {
  createPropertyIntoDB,
  getAllPropertiesFromDB,
  getPropertyDetailsFromDB,
  deletePropertyFromDB,
  updatePropertyInDB,
};
