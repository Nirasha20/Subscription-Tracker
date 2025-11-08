import { Client as workflow } from "@upstash/workflow";
import { QSTASH_TOKEN, QSTASH_URL } from "./env";

export const workflowClient = workflowClientlient(clientConfig: {
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});

export default client;
