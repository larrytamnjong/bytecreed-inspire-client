import { Component, Output, EventEmitter } from '@angular/core';
import { importExcelFile } from 'src/app/core/helpers/excel-utility';
import { ExcelImportConfig } from 'src/app/core/helpers/excel-utility';
@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrl: './excel-import.component.scss'
})
export class ExcelImportComponent {
  @Output() data = new EventEmitter<any[]>(); 


  excelConfig: ExcelImportConfig = {
    sex: 'number', 
    status: 'number' 
  };

  excelData?: any[];
  async onFileChange(event: any) {
    const file = event.target.files[0];
    try {
      this.excelData = await importExcelFile(file, this.excelConfig);
      this.data.emit(this.excelData);
    } catch (error) {
      this.data.emit([]);
    }
  }
}
