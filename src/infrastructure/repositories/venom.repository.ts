import { image as imageQr } from "qr-image";
import LeadExternal from "../../domain/lead-external.repository";

import MassiveExternal from "../../domain/massive-external.repository";

import { create, Whatsapp } from "venom-bot";

export class VenomTransporter implements MassiveExternal {
  intance: Whatsapp | undefined;

  constructor() {
    create({ session: "session" }).then((client) => (this.intance = client));
  }
  async sendMsg(massive: { names: string[]; phones: string[], link:string }): Promise<any> {
    try {
      const { names, phones, link } = massive;
      let i: number;
      let response;
      for(i=0; i < names.length; i++){
        response = await this.intance?.sendText(
          phones[i]+"@c.us", 
          'ℍ𝕠𝕝𝕒 👋🏻 '+names[i]
        );
        response = await this.intance?.sendText(
          phones[i]+"@c.us", 
          "ℂ𝕠𝕟𝕥𝕒𝕔𝕥𝕒𝕞𝕠𝕤 𝕡𝕠𝕣 𝕃𝕚𝕟𝕜𝕖𝕕𝕀𝕟, 𝕤𝕠𝕪 𝔻𝕚𝕖𝕘𝕠 ℂ𝕒𝕚𝕔𝕖𝕕𝕠 𝕕𝕖\n★彡 SAGGA 彡★"
        );
        response = await this.intance?.sendText(
          phones[i]+"@c.us", 
          "𝕄𝕖 𝕡𝕖𝕣𝕞𝕚𝕥𝕚 𝕥𝕠𝕞𝕒𝕣 𝕖𝕝 𝕟𝕦𝕞𝕖𝕣𝕠 𝕕𝕖 𝕥𝕖𝕝𝕖𝕗𝕠𝕟𝕠 𝕡𝕒𝕣𝕒 𝕚𝕟𝕧𝕚𝕥𝕒𝕣𝕥𝕖 𝕒 𝕥𝕠𝕞𝕒𝕣𝕟𝕠𝕤 𝕦𝕟 ☕ 𝕧𝕚𝕣𝕥𝕦𝕒𝕝 𝕪 𝕔𝕠𝕟𝕧𝕖𝕣𝕤𝕒𝕣 𝕕𝕖 𝕟𝕦𝕖𝕤𝕥𝕣𝕒𝕤 𝕤𝕠𝕝𝕦𝕔𝕚𝕠𝕟𝕖𝕤 𝕖𝕤𝕡𝕖𝕔𝕚𝕒𝕝𝕚𝕫𝕒𝕕𝕒"
        );
        response = await this.intance?.sendImage(
          phones[i]+"@c.us",
          './src/images/Emociones.jpg',
          '',
          '𝔸𝕢𝕦𝕚 👆🏻𝕦𝕟𝕠 𝕕𝕖 𝕟𝕦𝕖𝕤𝕥𝕣𝕠𝕤 𝕤𝕖𝕣𝕧𝕚𝕔𝕚𝕠𝕤 𝕖𝕤𝕥𝕣𝕖𝕝𝕝𝕒 💫'
        );
        response = await this.intance?.sendText(
          phones[i]+"@c.us",
          "𝕋𝕖 𝕕𝕖𝕛𝕠 𝕖𝕝 𝕝𝕚𝕟𝕜 𝕕𝕖 𝕞𝕚 𝕔𝕒𝕝𝕖𝕟𝕕𝕒𝕣𝕚𝕠 🗓 𝕡𝕒𝕣𝕒 𝕒𝕘𝕖𝕟𝕕𝕒𝕣 𝕦𝕟𝕒 𝕣𝕖𝕦𝕟𝕚𝕠𝕟 𝕪 𝕔𝕠𝕞𝕡𝕒𝕣𝕥𝕚𝕣 𝕟𝕦𝕖𝕤𝕥𝕣𝕠𝕤 𝕔𝕒𝕤𝕠𝕤 𝕕𝕖 𝕖𝕩𝕚𝕥𝕠 👇🏻\n"+link
        );
        response = await this.intance?.sendFile(
          phones[i]+"@c.us",
          './src/files/SAGGA_IngenieriaRendimiento.pdf',
          'SAGGA_IngenieriaRendimiento',
          ''
        );
      }
      return Promise.resolve(response);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}
