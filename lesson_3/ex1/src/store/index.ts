import { Project, Category, Product } from '../models';
import projects from './projects.json';
import categories from './categories.json';
import products from './products.json';


interface Store {
  loadProjects: () => Promise<Project[]>;
  loadCategories: () => Promise<Category[]>;
  loadProducts: () => Promise<Product[]>;
  categories: Category[];
}

const store: Store = {
  loadProjects: () => Promise.resolve(projects),
  loadCategories: () => Promise.resolve(categories),
  loadProducts: () => Promise.resolve(products),
  categories: categories
};

export { store };
