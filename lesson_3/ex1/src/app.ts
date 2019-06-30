import express from 'express';
import cors from 'cors';
import { config } from './controllers';
import { log } from './middleware/log';
import { logError } from './middleware/logError';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(log);

Object.keys(config).forEach((k) => {
  const routeConfig = config[k];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(logError);

export { app };
