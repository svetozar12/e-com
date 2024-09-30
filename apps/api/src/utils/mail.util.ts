import { Transporter, createTransport, SendMailOptions } from 'nodemailer';
import { envs } from '../main';
import kleur from 'kleur';

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
    if (envs.NODE_ENV !== 'production') {
      // console.log(
      //   'EMAIL INTERCEPTED MESSAGE !!!(ONLY IN DEV AND TEST ENVIRONMENT)!!! \n',
      //   `from: ${this.transporter.options.auth.user} \n`,
      //   `TO: ${to} \n`,
      //   `SUBJECT: ${subject} \n`,
      //   `TEXT: ${text} \n`
      // );
      console.log(
        kleur
          .red()
          .bold(
            'EMAIL INTERCEPTED MESSAGE !!!(ONLY IN DEV AND TEST ENVIRONMENT)!!!'
          )
      );
      console.log(kleur.blue(`from: ${this.transporter.options.auth.user}`));
      console.log(kleur.blue(`TO: ${to}`));
      console.log(kleur.blue(`SUBJECT: ${subject}`));
      console.log(kleur.blue(`TEXT: ${text}`));
      // mock successful email when working on development or test environment
      return callback(null, null);
    }
    this.transporter.sendMail(mailOptions, callback);
  }
}

export default GmailTransporter;
