import nodemailer from 'nodemailer';
import { API_URL, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '../config/constants';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class MailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    } as SMTPTransport.Options);
  }

  async sendActivationMail(to: string, link: string) {
    const fullActivationLink = `${API_URL}/api/v1/activate/${link}`;

    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: 'Активация аккаунта' + API_URL,
      text: '',
      html: `
        <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${fullActivationLink}">${fullActivationLink}</a>
        </div>
      `,
    });
  }
}

export default new MailService();
