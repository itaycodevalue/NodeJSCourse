import { Request, Response } from 'express';
import { store } from '../store';
import { wrapAsyncAndSend } from '../utils/async';

export const getAll = wrapAsyncAndSend(
  (req: Request, res: Response) => store.loadProjects());
