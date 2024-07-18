import { Request, Response } from "express";
import { MassiveCreate } from "../../application/massive.create";

class MassiveCtrl {
  constructor(private readonly massiveCreator: MassiveCreate) {}

  public sendCtrl = async ( req: Request, res: Response) => {
    const response = await this.massiveCreator.sendMessageAndSave()
    res.send(response);
  };
}

export default MassiveCtrl;