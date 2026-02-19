import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { CLIENT_URL, DB_CONNECTION, PORT } from './config/constants';
import router from './routes';
import { errorsHandler } from './middlewares/errorsMiddleware';
import path from 'path';

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    origin: CLIENT_URL,
  }),
);
app.use(cookieParser());
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use('/api/v1', router);
app.use(errorsHandler);

const startServer = () => {
  try {
    mongoose.connect(DB_CONNECTION).then(() => console.log('Connected to the database'));

    app.listen(PORT, () => {
      console.log(`Server started at PORT:${PORT}...`);
    });
  } catch (err) {
    console.log(`Error while trying to connect to the server: ${err}`);
  }
};

startServer();
