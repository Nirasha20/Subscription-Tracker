import { Router } from "express";
import { send } from "process";
const workflowRouter = Router();

workflowRouter.post('/subscription/reminder',  sendReminders);

export default workflowRouter;