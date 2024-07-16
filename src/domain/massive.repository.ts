import { Massive } from "./massive";

/**
 * Esta la interfaz que debe de cumplir el repositorio de infraestructura
 * mysql o mongo o etc
 */
export default interface MassiveRepository {
  save({
    names,
    phones,
    link,
  }: {
    names: string[];
    phones: string[];
    link:string;
  }): Promise<Massive | undefined | null>;
  getDetail(id:string):Promise<Massive | null | undefined>
}
