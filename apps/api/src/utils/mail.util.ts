import { Transporter, createTransport, SendMailOptions } from 'nodemailer';
import { envs } from '../main';

class GmailTransporter {
  private transporter: Transporter;

  constructor() {
    const { GMAIL_EMAIL, GMAIL_PASSWORD } = envs;
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_PASSWORD,
      },
    });
  }

  sendEmail(
    to: string,
    subject: string,
    text: string,
    callback: (error: Error | null, info: any) => void
  ): void {
    const mailOptions: SendMailOptions = {
      from: this.transporter.options.auth.user,
      to,
      subject,
      text,
    };
    this.transporter.sendMail(mailOptions, callback);
  }
}

export default GmailTransporter;
