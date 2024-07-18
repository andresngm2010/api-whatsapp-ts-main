import { Request, Response } from "express";
import { MassiveCreate } from "../../application/massive.create";

class MassiveCtrl {
  constructor(private readonly massiveCreator: MassiveCreate) {}

  public sendCtrl = async ( req: Request, res: Response) => {
    const response = await this.massiveCreator.sendMessageAndSave()
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Mi Página HTML</title>
      </head>
      <body>
        ${response.responseExSave}
      </body>
      </html>
    `;
    res.send(htmlContent);
  };
}

export default MassiveCtrl;