import { Router } from 'express';
import { router as categories } from './categories';

interface RouteConfig {
  prefix: string;
  router: Router;
}

const config: { [k: string]: RouteConfig } = {
  projects: {
    prefix: '/api/categories',
    router: categories,
  },
};

export { config };
