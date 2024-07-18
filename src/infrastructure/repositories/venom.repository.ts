import { image as imageQr } from "qr-image";
import * as fs from 'fs';
import * as path from 'path';
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

  async sendMsg(): Promise<any> {
    let response = "";
    let fallidas = 0;
    let correctas = 0;
    const errores: string[] = [];
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const safeTimestamp = timestamp.replace(/:/g, '-');

    function cleanString(input: string): string {
      // Eliminar paréntesis, signos + y espacios
      const step1 = input.replace(/[()+\s]/g, '');
      // Eliminar ceros al inicio
      const step2 = step1.replace(/^0+/, '');
      return step2;
    }

    for (const row of data) {
      const phone = cleanString(row.Phone);
      const name = row.Name;
      const lastname = row.Lastname;
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
          } catch (error) {
            bandera = false;
            throw error; 
          }
        };
    
        if (bandera) {
          correctas++;
        }
      } catch (error:any) {
        fallidas++;
        errores.push(`Error al enviar el mensaje a ${phone}: ${error.text} \n`);
      }
    };

    if (errores.length > 0) {
      const errorDirectory = `./src/files/errores/${safeTimestamp}`;
      fs.mkdirSync(errorDirectory, { recursive: true });
      const erroresPath = path.join(errorDirectory, 'errores.txt');
      fs.writeFileSync(erroresPath, errores.join(''), 'utf8');
    }

    response = `<html><h1>El resultado del envío es el siguiente: Correctos = ${correctas} Fallidas = ${fallidas}</h1></html>`;

    return Promise.resolve(response);

  }
}
