import express from 'express';
import './config/env.js';
import userRouter from './route/user.routes.js';
import authRouter from './route/auth.routes.js';
import subscriptionRouter from './route/subscription.routes.js';

// Initialize express app

const app = express();

app.get('/',(req,res)=>{
    res.send('Welcome to the subscription API!');
});

// Use PORT from environment if provided, otherwise default to 3000
const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Helpful error handling (e.g., when the port is already in use)
server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Set a different PORT (e.g., 3001) and try again.`);
        console.error('PowerShell example:  $env:PORT=3001; npm run dev');
        process.exit(1);
    }
    throw err;
});

export default app;