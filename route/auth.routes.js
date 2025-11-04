import { Router } from "express";

const authRouter = Router();
authRouter.post('/sign-up', (req, res) => {
    // Handle user sign-up
    res.send('User signed up');
});
authRouter.post('/sign-in', (req, res) => {
    // Handle user sign-in
    res.send('User signed in');
});
authRouter.post('/sign-out', (req, res) => {
    // Handle user sign-out
    res.send('User signed out');
});

export default authRouter;