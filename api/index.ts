import app from '../src/app';
import { connectDB } from '../src/config/database';

let isConnected = false;

const handler = async (req: any, res: any) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error('[Vercel Handler] Database connection failed:', error);
    }
  }
  return app(req, res);
};

export default handler;
