import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: true, // In production, replace with specific frontend origins
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the EstateFlow Server API!',
  });
});

// Application Routes
app.use('/api', router);

// Handle Not Found Routes
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
