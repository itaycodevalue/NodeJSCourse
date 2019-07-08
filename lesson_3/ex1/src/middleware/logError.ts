import { Request, Response, NextFunction } from 'express';

export function logError(error: Error, req: Request, res: Response, next: NextFunction) {
  next(error);
}
