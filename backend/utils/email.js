import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import {
  passwordResetEmail,
  welcomeEmail
} from '../EmailTemplate/generateEmailTemplate.js';

export default class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Temitope Olawuni <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = template;

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      welcomeEmail(this.firstName, this.url),
      'Welcome to the Natours Family!'
    );
  }

  async sendPasswordReset() {
    await this.send(
      passwordResetEmail(this.firstName, this.url),
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}
