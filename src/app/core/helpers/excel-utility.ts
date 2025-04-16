import * as XLSX from 'xlsx';


export interface ExcelImportConfig {
  [key: string]: 'string' | 'number' | 'boolean' | 'date';
}
export function exportJsonToExcel(data: any[], fileName: string = 'excel.xlsx'): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Sheet1': worksheet },
    SheetNames: ['Sheet1']
  };

  XLSX.writeFile(workbook, fileName);
}

export function importExcelFile(file: File, config?: ExcelImportConfig): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        let json = XLSX.utils.sheet_to_json<any>(worksheet, { raw: false, dateNF: 'yyyy-mm-dd' });

        if (config) {
          json = json.map(row => {
            const transformed: any = { ...row };
            for (const key in config) {
              if (transformed[key] !== undefined) {
                switch (config[key]) {
                  case 'number':
                    const parsed = Number(transformed[key]);
                    transformed[key] = isNaN(parsed) ? transformed[key] : parsed;
                    break;
                  case 'boolean':
                    transformed[key] = transformed[key] === 'true' || transformed[key] === true;
                    break;
                  case 'date':
                    transformed[key] = new Date(transformed[key]);
                    break;
                  case 'string':
                    transformed[key] = String(transformed[key]);
                    break;
                }
              }
            }
            return transformed;
          });
        }
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

