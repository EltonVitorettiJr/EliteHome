import type { VisitsRepository } from "../database/repositories/visits";
import type { Visit } from "../entities/visit";
import { type VisitStatus, visitStatus } from "../enums/visit-status";
import { NotFoundError } from "../errors/not-found-error";
import type { MailProvider } from "../providers/mail-provider";

interface UpdateVisitUseCaseRequest {
  name?: string;
  phone?: string;
  email?: string;
  date?: Date;
  visitStatus?: VisitStatus;
  propertyId?: string;
}

interface UpdateVisitUseCaseReply {
  visit: Visit;
}

export class UpdateVisitUseCase {
  constructor(
    private visitsRepository: VisitsRepository,
    private mailProvider: MailProvider,
  ) {}

  async execute(
    id: string,
    data: UpdateVisitUseCaseRequest,
  ): Promise<UpdateVisitUseCaseReply> {
    const visitExists = await this.visitsRepository.findByPropertyId(id);

    if (!visitExists) {
      throw new NotFoundError("Visit not found.");
    }

    const updateVisit = await this.visitsRepository.update(id, data);

    switch (data.visitStatus) {
      case visitStatus.CONFIRMED:
        await this.mailProvider.sendMail({
          to: updateVisit.email,
          subject: "Sua visita foi CONFIRMADA! 🎉",
          body: `
            <h1>Olá, ${updateVisit.name}!</h1>
            <p>Sua visita para o imóvel foi confirmada.</p>
            <p>Data: ${updateVisit.date.toLocaleString()}</p>
            <p>Nossos corretores entrarão em contato em breve para mais detalhes.</p>
          `,
        });
        break;
      case visitStatus.CANCELLED:
        await this.mailProvider.sendMail({
          to: updateVisit.email,
          subject: "Sua visita foi CANCELADA. ❌",
          body: `
            <h1>Olá, ${updateVisit.name}!</h1>
            <p>Sua visita para o imóvel foi cancelada.</p>
            <p>Data: ${updateVisit.date.toLocaleString()}</p>
            <p>Se você tiver alguma dúvida, entre em contato conosco.</p>
          `,
        });
        break;
      case visitStatus.COMPLETED:
        await this.mailProvider.sendMail({
          to: updateVisit.email,
          subject: "Sua visita foi concluída! 🎉",
          body: `
            <h1>Olá, ${updateVisit.name}!</h1>
            <p>Sua visita para o imóvel foi concluída.</p>
            <p>Data: ${updateVisit.date.toLocaleString()}</p>
            <p>Agradecemos por visitar o imóvel. Se tiver interesse em outros imóveis, não hesite em nos contatar!</p>
          `,
        });
        break;
    }

    return { visit: updateVisit };
  }
}
