import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const REMINDERS = [7, 5, 2, 1]; // days before renewal
const { serve } = require("@upstash/workflow/express");
export const sendReminders = serve( async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') 
        return ;
    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`);
        return;
    }

    for(const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        
        // schedule or send reminder for reminderDate
        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `${daysBefore} day`, reminderDate);
        }
        await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
    }
    if(dayjs().isSame(renewalDate, 'day')) {
        await triggerReminder(context, `0 days before reminder`, subscription);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async() => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}
const sleepUntilReminder = async (context, label, date  ) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}
const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        await sendRemindersEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        });
    });
}
