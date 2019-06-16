import * as express from 'express';
import * as cors from 'cors';
import { projects } from './controllers';
import { products } from './controllers';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

projects(app);
products(app);

export { app };
