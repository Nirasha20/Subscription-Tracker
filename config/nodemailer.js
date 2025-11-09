import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env';

export const accountEmail = 'nirashademel2000@gmail.com';

const transport = nodemailer.createTransport({
     service: 'gmail',
     auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD
     }
});