import { Request, Response } from "express";
import { LeadCreate } from "../../application/lead.create";

class LeadCtrl {
  constructor(private readonly leadCreator: LeadCreate) {}

  public sendCtrl = async ({ body }: Request, res: Response) => {
    const { name, phone } = body;
    const response = await this.leadCreator.sendMessageAndSave({ name, phone })
    res.send(response);
  };
}

export default LeadCtrl;
