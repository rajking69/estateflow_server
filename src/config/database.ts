import mongoose from 'mongoose';
import config from './index';
import { IUser } from '../modules/user/user.interface';

export const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = config.database_url;
    const dbName = config.db_name;

    if (!dbUrl) {
      throw new Error('DATABASE_URL is not defined in environment variables.');
    }

    // Set up connection event listeners for production logging
    mongoose.connection.on('connected', () => {
      console.log(`[Database] MongoDB connected to database: ${dbName || 'default'}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error(`[Database] MongoDB connection error:`, err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('[Database] MongoDB connection disconnected.');
    });

    // Establish connection to MongoDB Atlas
    await mongoose.connect(dbUrl, {
      dbName: dbName,
    });

    // Seed default demo accounts
    await seedDemoUsers();
  } catch (error) {
    console.error('[Database] Critical error establishing MongoDB connection:', error);
    throw error;
  }
};

const seedDemoUsers = async () => {
  try {
    const { User } = await import('../modules/user/user.model');
    
    // Purge old buyer/broker to avoid duplicates and ensure role schema matching
    await User.deleteMany({ email: { $in: ['buyer@estateflow.com', 'broker@estateflow.com'] } });

    const usersToSeed: IUser[] = [
      {
        name: 'Admin',
        email: 'admin@estateflow.com',
        password: 'Admin@123',
        role: 'admin',
      },
      {
        name: 'Broker',
        email: 'broker@estateflow.com',
        password: 'Broker@123',
        role: 'seller',
      },
      {
        name: 'Buyer',
        email: 'buyer@estateflow.com',
        password: 'Buyer@123',
        role: 'buyer',
      },
    ];

    for (const userData of usersToSeed) {
      const userExists = await User.findOne({ email: userData.email });
      if (!userExists) {
        await User.create(userData);
        console.log(`[Seed] Created user: ${userData.email}`);
      } else {
        // Enforce update to default verification passwords
        userExists.name = userData.name;
        userExists.password = userData.password;
        await userExists.save();
        console.log(`[Seed] Updated user properties verification: ${userData.email}`);
      }
    }
  } catch (err) {
    console.error('[Seed] Error seeding demo accounts:', err);
  }
};
