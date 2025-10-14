import dotenv from 'dotenv';
dotenv.config();

const { PORT, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

export const Config = { PORT, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST }