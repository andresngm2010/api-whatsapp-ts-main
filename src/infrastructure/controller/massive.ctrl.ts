import { Request, Response } from "express";
import { MassiveCreate } from "../../application/massive.create";

class MassiveCtrl {
  constructor(private readonly massiveCreator: MassiveCreate) {}

  public sendCtrl = async ({ body }: Request, res: Response) => {
    const { names, phones, link } = body;
    const response = await this.massiveCreator.sendMessageAndSave({ names, phones, link })
    res.send(response);
  };
}

export default MassiveCtrl;