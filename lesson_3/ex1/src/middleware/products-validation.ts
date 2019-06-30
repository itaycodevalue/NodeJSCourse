import { Request, Response, NextFunction } from 'express';
import { store } from '../store';
import { Category } from '../models';

const loadCategories = store.loadCategories;

export interface ResponseWithProjects extends Response {
    locals: { categories: Category[] };
}

export function validateProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    loadCategories()
        .then(categories => {
            const existing = categories.find(p => p.id === id);
            if (isNaN(id)) {
                res.sendStatus(400);
                return;
            }
            if (!existing) {
                res.sendStatus(500).send({ error: "something went wrong!" });
                return;
            }
            next();
        })
        .catch(next);
}
