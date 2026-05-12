import type { PropertiesRepository } from "../database/repositories/properties";
import type { VisitsRepository } from "../database/repositories/visits";
import type { Visit } from "../entities/visit";
import { AlreadyExistsError } from "../errors/already-exists-error";
import { NotFoundError } from "../errors/not-found-error";
import type { MailProvider } from "../providers/mail-provider";

export interface CreatePublicVisitUseCaseRequest {
  name: string;
  phone: string;
  email: string;
  date: Date;
  propertyId: string;
}

export interface CreatePublicVisitUseCaseReply {
  visit: Visit;
}

export class CreatePublicVisitUseCase {
  constructor(
    private visitsRepository: VisitsRepository,
    private propertiesRepository: PropertiesRepository,
    private mailProvider: MailProvider,
  ) {}

  async execute(
    data: CreatePublicVisitUseCaseRequest,
  ): Promise<CreatePublicVisitUseCaseReply> {
    const propertyExists = await this.propertiesRepository.findById(
      data.propertyId,
    );

    if (!propertyExists) {
      throw new NotFoundError("Property not found.");
    }

    const visitExists = await this.visitsRepository.findVisitByUserEmail(
      data.email,
      data.propertyId,
    );

    if (
      visitExists &&
      visitExists?.visitStatus !== "CANCELLED" &&
      visitExists?.visitStatus !== "COMPLETED"
    ) {
      throw new AlreadyExistsError("This visit already exists!");
    }

    const visit = await this.visitsRepository.create(data);

    await this.mailProvider.sendMail({
      to: data.email,
      subject: "Recebemos seu interesse na visita!",
      body: `
        <h1>Olá, ${data.name}!</h1>
        <p>Recebemos o seu interesse em visitar o imóvel.</p>
        <p>Nossos corretores entrarão em contato em breve para confirmar a data.</p>
      `,
    });

    await this.mailProvider.sendMail({
      to: "gerencia@elitehome.com.br",
      subject: `🚨 Novo interesse de visita: ${propertyExists.name}`,
      body: `
        <h1>Nova Visita Solicitada!</h1>
        <p><strong>Cliente:</strong> ${data.name}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>Imóvel:</strong> ${propertyExists.name}</p>
        <br>
        <p>Acesse o painel administrativo para aprovar ou cancelar esta visita.</p>
      `,
    });

    return { visit };
  }
}
