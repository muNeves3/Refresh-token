import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: 'Token is missing',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    verify(token, '0493e565-0dcb-4d52-93d0-3dcf749edd5a');

    return next();
  } catch (e) {
    return response.status(401).json({
      message: 'Token invalid',
    });
  }
}
