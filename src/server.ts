import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes';
import AppError from './shared/AppError';

const app = express();
app.use(express.json());
app.use(router);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(
        err.statusCode >= 100 && err.statusCode < 600 ? err.statusCode : 500,
      )
      .send(err.message)
      .json({
        status: 'error',
        message: err.message,
      });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3000, () => console.log('Server runing on 3000'));
