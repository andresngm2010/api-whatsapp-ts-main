import { image as imageQr } from "qr-image";
import LeadExternal from "../../domain/lead-external.repository";
import data from "../../application/readExcel";
import template from "../../application/readTemplate";

import MassiveExternal from "../../domain/massive-external.repository";

import { create, Whatsapp } from "venom-bot";

export class VenomTransporter implements MassiveExternal {
  intance: Whatsapp | undefined;

  constructor() {
    create({ session: "session" }).then((client) => (this.intance = client));
  }

  async sendMsg(cel:string, nombre:string, apellido:string, errores:string[]): Promise<any> {
    let response = "";
    //let fallidas = 0;
    //let correctas = 0;

    function cleanString(input: string): string {
      // Eliminar paréntesis, signos + y espacios
      const step1 = input.replace(/[()+\s]/g, '');
      // Eliminar ceros al inicio
      const step2 = step1.replace(/^0+/, '');
      return step2;
    }

    const phone = cleanString(cel);
    const name = nombre;
    const lastname = apellido;

    let bandera = true;
    
    try {
      for (const templateRow of template) {
        const tipo = templateRow.Tipo;
        const mensaje = `${templateRow.Mensaje}`;
        const directorio = templateRow.Directorio;
        const nombreArchivo = templateRow.NombreArchivo;
        bandera = true;
    
        try {
          if (tipo === 'Texto') {
            await this.intance?.sendText(
              `${phone}@c.us`,
              eval("`"+mensaje+"`")
            )
          } else if (tipo === 'Imagen' || tipo === 'Video' || tipo === 'Archivo') {
            await this.intance?.sendFile(
              `${phone}@c.us`,
              directorio,
              nombreArchivo,
              eval("`"+mensaje+"`")
            )
          }
        } catch (error:any) {
          bandera = false;
          errores.push(`Error al enviar el mensaje a ${phone}: ${error.text} \n`);
          response = `Error al enviar el mensaje a ${phone}: ${error.text}`
          return Promise.reject(error);
        }
      };
  
      if (bandera) {
        //correctas++;
      }
    } catch (error:any) {
      //fallidas++;
      errores.push(`Error al enviar el mensaje a ${phone}: ${error.text} \n`);
      response = `Error al enviar el mensaje a ${phone}: ${error.text}`
      return Promise.reject(error);
    }
  //};

    //response = `<html><h1>El resultado del envío es el siguiente: Correctos = ${correctas} Fallidas = ${fallidas}</h1></html>`;

    response = `Exito al enviar el mensaje a ${phone}`
    return Promise.resolve(response);

  }
}
