import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CLIENT_URL, DB_CONNECTION, PORT } from './config/constants';
import router from './routes';
import mongoose from 'mongoose';

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
app.use('/api/v1', router);

const startServer = () => {
    try {
        mongoose.connect(DB_CONNECTION)
            .then(() => console.log("Connected to the database"))

        app.listen(PORT, () => {
            console.log(`Server started at PORT:${PORT}...`);
        })
    } catch (err) {
        console.log(`Error while trying to connect to the server: ${err}`);
    }
}

startServer();