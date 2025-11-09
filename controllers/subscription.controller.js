import Subscription from "../models/subscription.model.js";
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        // Trigger external workflow with a single options object
        await workflowClient.trigger({
            url: process.env.SERVER || '',
            body: { subscriptionId: subscription._id, ...req.body },
            headers: { 'Content-Type': 'application/json' },
            workflowRunId: undefined,
            retries: 3
        });
        res.status(201).json({ success: true, data: { subscription } });
    } catch (e){
        next(e);
    }
}
export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user._id !== req.params.id){
            const error = new Error('Unauthorized access to subscriptions');
            error.statusCode = 401;
            throw error;
        }
    const subscriptions = await Subscription.find({ user: req.params.id });
    // trigger reminder workflow for this user
    const { workflowRunId } = await workflowClient.trigger({
        url: `${process.env.SERVER || ''}/api/v1/workflows/subscription/reminder`,
        body: { userId: req.params.id },
        headers: { 'Content-Type': 'application/json' },
        retries: 0,
    });
        res.status(200).json({ success: true, data: { subscriptions } });
    } catch (e) {
        next(e);
    }
}