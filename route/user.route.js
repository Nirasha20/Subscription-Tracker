 import { Router } from "express";

 const userRouter =Router();

 userRouter.get('/', (req,res) => {
     // Handle fetching user details
     res.send('Get User details');
 });
 userRouter.put('/', (req,res) => {
     // Handle updating user details
     res.send('Update User details');
 });
 userRouter.delete('/', (req,res) => {
     // Handle deleting user account
     res.send('Delete User account');
 });

 export default userRouter;