import{Router } from "express";

 const subscriptionRouter =Router();
 
 subscriptionRouter.get('/', (req,res) => {
     // Handle fetching all subscriptions
     res.send('Get all Subscriptions');
 });
 

 export default subscriptionRouter;
 