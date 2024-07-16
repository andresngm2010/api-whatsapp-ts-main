import { v4 as uuid } from "uuid";

export class Massive {
  readonly uuid: string;
  readonly names: string[];
  readonly phones: string[];
  readonly link: string;

  constructor({ names, phones, link }: { names: string[]; phones: string[], link:string }) {
    this.uuid = uuid();
    this.names = names;
    this.phones = phones;
    this.link = link;
  }
}
