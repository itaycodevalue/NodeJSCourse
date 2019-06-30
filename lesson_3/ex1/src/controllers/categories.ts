import express from 'express';
import * as categoriesRoutes from '../routes/categories';
import { store } from '../store';
import { wrapAsync } from '../utils/async';
import { Category } from '../models';
import { validateProduct } from '../middleware/products-validation';


const loadCategories = store.loadCategories;
const loadProducts = store.loadProducts;

const router = express.Router();

router.get('/', categoriesRoutes.getAll);

router.get('/:id/products', wrapAsync(async (req, res, next) => {
  // TODO: finding existing project repeats in multiple routes, can reuse via multiple route handlers (using 'res.locals')
  const id = req.params.id;
  const existing = (await loadProducts()).filter(p => p.categoryId === id);

  if (!existing) {
    // TODO: sending 404 if existing is not found repeats in other routes, can reuse via multiple route handlers
    res.sendStatus(404);
    return;
  }

  res.send(existing);
}));


// TODO: route handlers should be in a separate module (e.g. src/routes/projects)

router.get('/:id', wrapAsync(async (req, res, next) => {
  // TODO: finding existing project repeats in multiple routes, can reuse via multiple route handlers (using 'res.locals')
  const id = req.params.id;
  const existing = (await loadCategories()).find(p => p.id === id);
  if (isNaN(id)) {
    res.sendStatus(404);
    return;
  }
  else if (!existing) {
    // TODO: sending 404 if existing is not found repeats in other routes, can reuse via multiple route handlers
    res.sendStatus(400);
    return;
  }

  res.send(existing);
}));

router.post('/', (req, res) => {
  const category = req.body as Category;
  const categories = store.categories;
  category.id = (categories.length + 1).toString();
  categories.push(category);

  res.status(201).send(category);
});

router.put('/:id', validateProduct, (req, res) => {
  const id = req.params.id;
  const categories = store.categories;
  const existing = categories.find(p => p.id === id);

  const category = req.body as Category;
  category.id = id;
  Object.assign(existing, category);

  res.send(category);
});

router.delete('/:id', (req, res) => {
  const categories = store.categories;
  const id = req.params.id;
  const existingIndex = categories.findIndex(p => p.id === id);
  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }
  if (existingIndex < 0) {
    res.sendStatus(404);
    return;
  }

  categories.splice(existingIndex, 1);
  res.sendStatus(204);
});

export { router };
