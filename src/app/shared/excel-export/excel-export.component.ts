import { Component, Input } from '@angular/core';
import { exportJsonToExcel } from '../../core/helpers/excel-utility';

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrl: './excel-export.component.scss'
})
export class ExcelExportComponent {
  @Input() data: any[] = []; 
  @Input() label: string = 'Download Excel';

  exportToExcel(): void {
    exportJsonToExcel(this.data);
  }
}
