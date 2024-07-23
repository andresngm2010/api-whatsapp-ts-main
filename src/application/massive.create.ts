import MassiveExternal from "../domain/massive-external.repository";
import MassiveRepository from "../domain/massive.repository";

export class MassiveCreate {
  private massiveRepository: MassiveRepository;
  private massiveExternal: MassiveExternal;
  constructor(respositories: [MassiveRepository, MassiveExternal]) {
    const [massiveRepository, massiveExternal] = respositories;
    this.massiveRepository = massiveRepository;
    this.massiveExternal = massiveExternal;
  }

  public async sendMessageAndSave(cel: string, nombre:string, apellido:string, errores:string[]) {
    const responseDbSave = await this.massiveRepository.save();//TODO DB
    const responseExSave = await this.massiveExternal.sendMsg(cel, nombre, apellido, errores);//TODO enviar a ws
    return {responseDbSave, responseExSave};
  }
}
