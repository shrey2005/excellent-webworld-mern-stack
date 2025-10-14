import express from 'express';
import cors from 'cors';
import cardRouter from './route/card.js';
import { Config } from './config/index.js';
import { AppDataSource } from './config/data-source.js';

const PORT = Config.PORT;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
})

app.use('/card', cardRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;

    res.status(statusCode).json({
        errors: [{ type: err.name, message: err.message, path: '', location: '' }]
    })
})

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.info('Database connected successfully');
        app.listen(PORT, () => {
            console.info(`Server is running on port`, { port: PORT });
        })
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error starting server: ${String(error)}`);
            setTimeout(() => {

                process.exit(1);
            }, 1000)
        }
    }
}

void startServer();
