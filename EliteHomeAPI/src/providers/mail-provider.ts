export interface SendMailDTO {
  to: string;
  subject: string;
  body: string;
}

export interface MailProvider {
  sendMail(data: SendMailDTO): Promise<void>;
}
