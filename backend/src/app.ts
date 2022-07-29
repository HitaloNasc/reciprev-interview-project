import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/noutFound.middleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(router);
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
