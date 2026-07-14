import { z } from 'zod';

const createPropertyValidationSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }).min(3, 'Title must be at least 3 characters'),
    shortDescription: z.string({ message: 'Short description is required' }),
    description: z.string({ message: 'Description is required' }),
    propertyType: z.string({ message: 'Property type is required' }),
    price: z.number({ message: 'Price is required' }).nonnegative('Price must be a non-negative number'),
    location: z.string({ message: 'Location is required' }),
    bedrooms: z.number({ message: 'Bedrooms is required' }).int().nonnegative(),
    bathrooms: z.number({ message: 'Bathrooms is required' }).int().nonnegative(),
    area: z.number({ message: 'Area is required' }).positive('Area must be a positive number'),
    image: z.string({ message: 'Image is required' }).url('Image must be a valid URL'),
  }),
});

const updatePropertyValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    propertyType: z.string().optional(),
    price: z.number().nonnegative().optional(),
    location: z.string().optional(),
    bedrooms: z.number().int().nonnegative().optional(),
    bathrooms: z.number().int().nonnegative().optional(),
    area: z.number().positive().optional(),
    image: z.string().url().optional(),
  }),
});

export const PropertyValidation = {
  createPropertyValidationSchema,
  updatePropertyValidationSchema,
};
