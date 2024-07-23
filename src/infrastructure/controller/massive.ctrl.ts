import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';
import { MassiveCreate } from "../../application/massive.create";
import data from "../../application/readExcel";

class MassiveCtrl {
  constructor(private readonly massiveCreator: MassiveCreate) {}

  public sendCtrl = async (req: Request, res: Response) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const safeTimestamp = timestamp.replace(/:/g, '-');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write('data: {"message": "Conexion establecida"}\n\n');

    let errores: string[] = [];
    let cont = 1;

    const workbook = xlsx.readFile('./src/files/ingresoDatos.xlsx');

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    for (const row of data) {
      const cel = row.Phone;
      const nombre = row.Name;
      const apellido = row.Lastname;
      cont++;
      const cellAddress = `D${cont}`;
      
      try {
        const response = await this.massiveCreator.sendMessageAndSave(cel, nombre, apellido, errores);
        const { responseExSave } = response;
        res.write(`data: ${JSON.stringify({ enviado: true, data: responseExSave })}\n\n`);
        const cellValue = "Correcto";
        worksheet[cellAddress] = { v: cellValue, t: 's' };

      } catch (error:any) {
        res.write(`data: ${JSON.stringify({ enviado: false, error: error.text, phone: cel })}\n\n`);
        const cellValue = "Error";
        worksheet[cellAddress] = { v: cellValue, t: 's' };
      }
    };

    xlsx.writeFile(workbook, './src/files/ingresoDatos.xlsx');

    if (errores.length > 0) {
      const errorDirectory = `./src/files/errores/${safeTimestamp}`;
      fs.mkdirSync(errorDirectory, { recursive: true });
      const erroresPath = path.join(errorDirectory, 'errores.txt');
      fs.writeFileSync(erroresPath, errores.join(''), 'utf8');
    }

    res.write('data: {"message": "Envio de mensajes terminado"}\n\n');

    req.on('close', () => {
      res.end();
    });
  };
}

export default MassiveCtrl;