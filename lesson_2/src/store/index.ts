import { Project, Product } from '../models';
import * as projects from './projects.json';
import * as products from './products.json';

interface Store {
  projects: Project[];
  products:Product[];
}

const store: Store = {
  projects,products,
};

export { store };
