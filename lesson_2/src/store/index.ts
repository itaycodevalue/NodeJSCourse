import { Project } from '../models';
import * as projects from './projects.json';

interface Store {
  projects: Project[];
}

const store: Store = {
  projects,
};

export { store };
