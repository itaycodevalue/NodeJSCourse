import { Request, Response, NextFunction } from 'express';

export function log(req: Request, res: Response, next: NextFunction) {
  // tslint:disable-next-line: no-console
  console.log('Time:', Date.now());
  next();
}

