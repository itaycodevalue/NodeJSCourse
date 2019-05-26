import * as express from 'express';
import * as cors from 'cors';
import { projects } from './controllers';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

projects(app);

export { app };
