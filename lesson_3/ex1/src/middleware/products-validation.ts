import { Request, Response, NextFunction } from 'express';
import { store } from '../store';
import { Category } from '../models';

const loadCategories = store.loadCategories;
const loadProducts = store.loadProducts;
export interface ResponseWithProjects extends Response {
    locals: { categories: Category[] };
}

export function validatePut(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    loadCategories()
        .then(categories => {
            const existing = categories.find(p => p.id === id);
            if (isNaN(id)) {
                res.sendStatus(400);
                return;
            }
            if (!existing) {
                res.sendStatus(500).send({ error: "put went wrong!" });
                return;
            }
            next();
        })
        .catch(next);
}

export function validateDelete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    loadCategories()
        .then(categories => {
            const existingIndex = categories.findIndex(p => p.id === id);
            if (isNaN(id)) {
                res.sendStatus(400);
                return;
            }
            if (existingIndex < 0) {
                res.sendStatus(500).send({ error: "delete went wrong!" });
                return;
            }
            next();
        })
        .catch(next);
}

export function validateGet(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    loadCategories()
        .then(categories => {
            const existing = categories.find(p => p.id === id);
            if (isNaN(id)) {
                res.sendStatus(404);
                return;
            }
            if (!existing) {
                res.sendStatus(400).send({ error: "get went wrong!" });
                return;
            }
            next();
        })
        .catch(next);
}

export function validateGetProducts(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    loadCategories()
        .then(async categories => {
            const existing = (await loadProducts()).filter(p => p.categoryId === id);
            if (isNaN(id)) {
                res.sendStatus(400);
                return;
            }
            if (!existing) {
                res.sendStatus(404).send({ error: "get products went wrong!" });
                return;
            }
            next();
        })
        .catch(next);
}
