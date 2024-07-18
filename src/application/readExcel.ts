import * as xlsx from 'xlsx';

interface RowData {
  Phone: string;
  Name: string;
  Lastname: string;
}

const workbook = xlsx.readFile('./src/files/ingresoDatos.xlsx');

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const data: RowData[] = xlsx.utils.sheet_to_json<RowData>(worksheet, {
  blankrows: true, // Permite filas en blanco
  defval: "" // Valor por defecto para celdas vacías
});

console.log(data);

export default data;
