import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

 userRouter.get('/', getUsers);
 userRouter.get('/:id', authorize, getUser);
 userRouter.post('/', (req,res) => {
     // Handle creating a new user
     res.send('Create a new User');
 });
 userRouter.put('/:id', (req,res) => {
     // Handle updating user details
     res.send('Update User details');
 });
 userRouter.delete('/', (req,res) => {
     // Handle deleting user account
     res.send('Delete User account');
 });

 export default userRouter;