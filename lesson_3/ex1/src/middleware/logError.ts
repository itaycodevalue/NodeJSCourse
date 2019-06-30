import { Request, Response, NextFunction } from 'express';

export function logError(error: Error, req: Request, res: Response, next: NextFunction) {
  // tslint:disable-next-line: no-console
  console.log("itay and yarin error");
  next(error);
}
