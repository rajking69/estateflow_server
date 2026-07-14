import { User } from './user.model';
import { Property } from '../property/property.model';
import { Review } from '../review/review.model';

const getUserProfileFromDB = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({});
  return result;
};

const updateUserRoleInDB = async (id: string, role: string) => {
  const result = await User.findByIdAndUpdate(id, { role }, { new: true });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  // Delete user properties and reviews first
  await Property.deleteMany({ createdBy: id });
  await Review.deleteMany({ userId: id });
  const result = await User.findByIdAndDelete(id);
  return result;
};

const getPlatformStatsFromDB = async () => {
  const totalUsers = await User.countDocuments({ role: 'buyer' });
  const totalBrokers = await User.countDocuments({ role: 'seller' });
  const totalProperties = await Property.countDocuments({});
  const totalReviews = await Review.countDocuments({});
  
  const priceStats = await Property.aggregate([
    {
      $group: {
        _id: null,
        averagePrice: { $avg: '$price' },
      },
    },
  ]);
  const averagePrice = priceStats.length > 0 ? Math.round(priceStats[0].averagePrice) : 0;

  return {
    totalUsers,
    totalBrokers,
    totalProperties,
    totalReviews,
    averagePrice,
  };
};

export const UserService = {
  getUserProfileFromDB,
  getAllUsersFromDB,
  updateUserRoleInDB,
  deleteUserFromDB,
  getPlatformStatsFromDB,
};
