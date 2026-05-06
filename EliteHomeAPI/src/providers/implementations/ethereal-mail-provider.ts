import nodemailer from "nodemailer";
import type { MailProvider, SendMailDTO } from "../mail-provider";

export class EtherealMailProvider implements MailProvider {
  private client: nodemailer.Transporter | null = null;

  private async getClient() {
    if (this.client) {
      return this.client;
    }

    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    this.client = transporter;

    return this.client;
  }

  async sendMail({ to, subject, body }: SendMailDTO): Promise<void> {
    const mailClient = await this.getClient();

    const message = await mailClient.sendMail({
      from: "Elite Home <noreply@elitehome.com.br>",
      to,
      subject,
      html: body,
    });

    console.log("Mensagem enviada com ID: %s", message.messageId);
    // gera o link de visualização do email no Ethereal
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
