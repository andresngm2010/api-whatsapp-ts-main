import { v4 as uuid } from "uuid";

export class Lead {
  readonly uuid: string;
  readonly name: string;
  readonly phone: string;

  constructor({ name, phone }: { name: string; phone: string }) {
    this.uuid = uuid();
    this.name = name;
    this.phone = phone;
  }
}
