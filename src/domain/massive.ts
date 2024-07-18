import { v4 as uuid } from "uuid";

export class Massive {
  readonly uuid: string;

  constructor() {
    this.uuid = uuid();
  }
}
