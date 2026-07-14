import { Request, Response } from 'express';

const notFound = (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found',
    error: '',
  });
};

export default notFound;
