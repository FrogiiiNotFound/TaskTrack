import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const API_URL = process.env.API_URL;
export const CLIENT_URL = process.env.CLIENT_URL;
export const ACTIVATE_URL = process.env.ACTIVATE_URL;
export const DB_CONNECTION = process.env.MONGO_DB as string;

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const SMTP_HOST = process.env.SMTP_HOST as string;
export const SMTP_PORT = process.env.SMTP_PORT as string;
export const SMTP_USER = process.env.SMTP_USER as string;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;

export const IMAGE_PATH = process.env.IMAGE_PATH;
