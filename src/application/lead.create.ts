import LeadExternal from "../domain/lead-external.repository";
import LeadRepository from "../domain/lead.repository";

export class LeadCreate {
  private leadRepository: LeadRepository;
  private leadExternal: LeadExternal;
  constructor(respositories: [LeadRepository, LeadExternal]) {
    const [leadRepository, leadExternal] = respositories;
    this.leadRepository = leadRepository;
    this.leadExternal = leadExternal;
  }

  public async sendMessageAndSave({
    name,
    phone,
  }: {
    name: string;
    phone: string;
  }) {
    const responseDbSave = await this.leadRepository.save({ name, phone });//TODO DB
    const responseExSave = await this.leadExternal.sendMsg({ name, phone });//TODO enviar a ws
    return {responseDbSave, responseExSave};
  }
}
