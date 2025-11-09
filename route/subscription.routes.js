import{Router } from "express";
import authorize from "../middlewares/auth.middleware";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller";

 const subscriptionRouter =Router();
 
 subscriptionRouter.get('/', (req,res) => {
     // Handle fetching all subscriptions
     res.send('Get all Subscriptions');
 });
  subscriptionRouter.get('/:id', (req,res) => {
     // Handle fetching a single subscription
     res.send(`Get Subscription details for subscription ${req.params.id}`);
 });
  subscriptionRouter.post('/', authorize, createSubscription);
  subscriptionRouter.put('/:id', (req,res) => {
     // Handle updating a subscription
     res.send(`Update Subscription details for subscription ${req.params.id}`);
 });
  subscriptionRouter.delete('/:id', (req,res) => {
     // Handle deleting a subscription
     res.send(`Delete Subscription with id ${req.params.id}`);
 });
  subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);      
  subscriptionRouter.put('/:id/cancel', (req,res) => {
        // Handle canceling a subscription
        res.send(`Cancel Subscription with id ${req.params.id}`);
 });
 subscriptionRouter.get('/upcoming-renewals', (req,res) => {
        // Handle fetching upcoming renewals
        res.send(`Get upcoming renewals`);
    });
 

 export default subscriptionRouter;
 