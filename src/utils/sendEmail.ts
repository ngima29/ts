import nodemailer, { Transporter } from 'nodemailer';
import * as dotenv from 'dotenv' ;
dotenv.config()
class SendEmail {
  private static instance: SendEmail;

  static get(): SendEmail {
    if (!SendEmail.instance) {
      SendEmail.instance = new SendEmail();
    }
    return SendEmail.instance;
  }

  sendMail(to: string, subject: string, html: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const transport: Transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
      };

      transport.sendMail(mailOptions, (error: Error | null, info: any) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info.response);
        }
      });
    });
  }
}

const sendEmail = SendEmail.get();

export { SendEmail, sendEmail };
