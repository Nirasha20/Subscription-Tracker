import express from 'express';
import cookieParser from 'cookie-parser';
import './config/env.js';
import userRouter from './route/user.routes.js';
import authRouter from './route/auth.routes.js';
import subscriptionRouter from './route/subscription.routes.js';
import { connect } from 'mongoose';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

// Initialize express app

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

// Basic route for testing

app.get('/',(req,res)=>{
    res.send('Welcome to the subscription API!');
});

// Use PORT from environment if provided, otherwise default to 3000
const PORT = Number(process.env.PORT) || 3000;

// Start the server with graceful fallback if the port is in use
function startServer(port, remainingTries = 5) {
    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        const connectToDatabase = async () => {
            try {
                await connect(process.env.DB_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                console.log(`Connected to MongoDB database.`);
            } catch (error) {
                console.error("Error connecting to MongoDB database:", error);
                process.exit(1); // Exit the process with failure
            }
        };
        connectToDatabase();
    });

    server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE') {
            if (remainingTries > 0) {
                const nextPort = port + 1;
                console.warn(`Port ${port} is already in use. Trying ${nextPort}...`);
                setTimeout(() => startServer(nextPort, remainingTries - 1), 250);
            } else {
                console.error(
                    `Port ${port} is already in use and automatic retries are exhausted.\n` +
                    `Set a different PORT and try again. Example (PowerShell):  $env:PORT=3001; npm run dev`
                );
                process.exit(1);
            }
        } else {
            throw err;
        }
    });
}

startServer(PORT);

export default app;