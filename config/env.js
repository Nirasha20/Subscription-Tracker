import { config } from "dotenv";
import { existsSync } from "fs";
import path from "path";

const envName = process.env.NODE_ENV || "development";
const candidatePaths = [
	path.resolve(process.cwd(), `.env.${envName}.local`),
	path.resolve(process.cwd(), "config", `.env.${envName}.local`),
];

for (const p of candidatePaths) {
	if (existsSync(p)) {
		config({ path: p, override: false });
		break;
	}
}

export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_KEY, ARCJECT_ENV, QSTASH_URL, QSTASH_TOKEN, QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY, EMAIL_PASSWORD } = process.env;