import * as xlsx from 'xlsx';

interface RowTemplate {
  Tipo: string;
  Mensaje: string;
  Directorio: string;
  NombreArchivo: string;
}

const workbook = xlsx.readFile('./src/files/plantillas/campañaIntesamente.xlsx');

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const template: RowTemplate[] = xlsx.utils.sheet_to_json<RowTemplate>(worksheet, {
    blankrows: true, // Permite filas en blanco
    defval: "" // Valor por defecto para celdas vacías
  });

console.log(template);

export default template;