import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { connectDB } from './config/database';

let server: Server;

async function bootstrap() {
  try {
    await connectDB();

    server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.log(`😈 unhandledRejection is detected, shutting down server...`, error);
  if (server) {
    server.close(() => {
      mongoose.disconnect().then(() => {
        process.exit(1);
      });
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.log(`😈 uncaughtException is detected, shutting down...`, error);
  process.exit(1);
});
