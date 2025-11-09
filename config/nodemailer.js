import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env';

const transport = nodemailer.createTransport({
     service: 'gmail',
     auth: {
        user: 'nirashademel2000@gmail.com',
        pass: EMAIL_PASSWORD
     }
});