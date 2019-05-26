import { Application } from 'express';
import { Project } from '../models';
import { store } from '../store';

const projects = store.projects;

function setup(app: Application) {
  // TODO: route handlers should be in a separate module (e.g. src/routes/projects)

  app.get('/api/projects', (req, res) => res.send(projects));

  app.get('/api/projects/:id', (req, res) => {
    // TODO: finding existing project repeats in multiple routes, can reuse via multiple route handlers (using 'res.locals')
    const id = req.params.id;
    const existing = projects.find(p => p.id === id);

    if (!existing) {
      // TODO: sending 404 if existing is not found repeats in other routes, can reuse via multiple route handlers
      res.sendStatus(404);
      return;
    }

    res.send(existing);
  });

  app.post('/api/projects', (req, res) => {
    const project = req.body as Project;

    project.id = (projects.length + 1).toString();
    projects.push(project);

    res.status(201).send(project);
  });

  app.put('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    const existing = projects.find(p => p.id === id);

    if (!existing) {
      res.sendStatus(404);
      return;
    }

    const project = req.body as Project;
    project.id = id;
    Object.assign(existing, project);

    res.send(project);
  });

  app.delete('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    const existingIndex = projects.findIndex(p => p.id === id);

    if (existingIndex < 0) {
      res.sendStatus(404);
      return;
    }

    projects.splice(existingIndex, 1);
    res.sendStatus(204);
  });
}

export default setup;
