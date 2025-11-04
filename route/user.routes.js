 import { Router } from "express";

 const userRouter =Router();

 userRouter.get('/', (req,res) => {
     // Handle fetching user details
     res.send('Get all Users');
 });
 userRouter.get('/:id', (req,res) => {
     // Handle fetching user details
     res.send(`Get User details  ${req.params.id}`);
 });
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