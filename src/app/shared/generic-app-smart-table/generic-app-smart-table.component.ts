import { Component, Input, Output, EventEmitter, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';

interface EditableFieldConfig {
  editable: boolean;
  type?: 'text' | 'number' | 'select' | 'date' | 'checkbox'; 
  selectOptions?: { value: any, label: string }[]; 
  required?: boolean;
  min?: number; 
  max?: number; 
  pattern?: string; 
}

@Component({
  selector: 'generic-app-smart-table',
  templateUrl: './generic-app-smart-table.component.html',
  styleUrl: './generic-app-smart-table.component.scss'
})
export class GenericAppSmartTableComponent implements OnChanges {
 @Input() headers: { key: string; displayName: string }[] = [];
  @Input() data: any[] = [];
  @Input() clickableColumns: string[] = []; 
  @Output() rowClicked = new EventEmitter<any>();
  @Input() showActions: boolean = false;
  @Input() showEdit: boolean = true;
  @Input() showDelete: boolean = true;
  @Output() editClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() saveClicked = new EventEmitter<any>();
  @Output() cancelClicked = new EventEmitter<any>();
  @Output() fieldChanged = new EventEmitter<{row: any, field: string, value: any}>();
  @Input() tableId: string = 'default'; 
  @Input() showRowSelect: boolean = false;
  @Output() selectedRowsChange = new EventEmitter<any[]>();
  @Input() customTemplates: { [key: string]: TemplateRef<any> } = {};
  
  @Input() editableFields: { [key: string]: EditableFieldConfig } = {};
  
  selectedRows = new Set<any>();
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: boolean = true; 
  currentPage: number = 0;
  pageSize: number = 5;
  
  editingRow: any = null;
  originalRowData: any = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.selectedRows.clear();
      this.emitSelectedRows(); 
      this.cancelEdit(); 
    }
  }

  onRowClick(row: any, event: MouseEvent) {
    if (!this.isEditing(row) && !(event.target as HTMLElement).tagName.toLowerCase().includes('input')) {
      this.rowClicked.emit(row);
    }
  }

  isEditableField(field: string): boolean {
    return this.editableFields[field]?.editable || false;
  }

  getFieldType(field: string): string {
    return this.editableFields[field]?.type || 'text';
  }

  getFieldMax(field: string): any {
    return Number(this.editableFields[field]?.max) || null;
  }

  getFieldMin(field: string): any {
    return Number(this.editableFields[field]?.min) || 0;
  }

  validateNumber(item: any, field: string) {
    let value = Number(item[field]);
    let min = this.getFieldMin(field);
    let max = this.getFieldMax(field);

    if (value === undefined || isNaN(value) || value === null) {
      item[field] = 0;
    }
    if (min !== undefined && value < min) {
      item[field] = min;
    }
    if (max !== undefined && value > max) {
      item[field] = max;
    }
  }

  getSelectOptions(field: string): { value: any, label: string }[] {
    return this.editableFields[field]?.selectOptions || [];
  }

  isEditing(row: any): boolean {
    return this.editingRow === row;
  }

  toggleEditMode(row: any, event: Event) {
    event.stopPropagation();
    
    if (this.isEditing(row)) {
      this.saveRow(row, event);
    } else {
      this.editingRow = row;
      this.originalRowData = {...row};
      this.editClicked.emit(row);
    }
  }

  saveRow(row: any, event: Event) {
    event.stopPropagation();
    this.editingRow = null;
    this.saveClicked.emit(row);
  }

  cancelEdit(row?: any, event?: Event) {
    if (event) event.stopPropagation();
    
    if (row && this.isEditing(row)) {
      Object.keys(this.originalRowData).forEach(key => {
        row[key] = this.originalRowData[key];
      });
    }
    
    this.editingRow = null;
    this.originalRowData = null;
    this.cancelClicked.emit(row);
  }

  onFieldBlur(row: any, field: string) {
    if (this.isEditing(row)) {
      this.fieldChanged.emit({
        row: row,
        field: field,
        value: row[field]
      });
    }
  }


  onSort(column: string) {
    this.sortDirection = this.sortColumn === column ? !this.sortDirection : true;
    this.sortColumn = column;

    this.data.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) return this.sortDirection ? -1 : 1;
      if (aValue > bValue) return this.sortDirection ? 1 : -1;
      return 0;
    });
    
    this.currentPage = 0; 
  }

  get filteredData() {
    return this.data.filter((item) =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
  );
  }

  get paginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
    }
  }

  onPageSizeChange(event: Event) {
    this.pageSize = Number((event.target as HTMLSelectElement).value);
    this.currentPage = 0; 
  }

  onSearchChange() {
    this.currentPage = 0; 
  }

  toggleRowSelection(row: any) {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
    this.emitSelectedRows();
  }
  
  toggleSelectAllRows(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const currentPageData = this.paginatedData; 
    
    if (checked) {
      currentPageData.forEach(row => this.selectedRows.add(row));
    } else {
      currentPageData.forEach(row => this.selectedRows.delete(row));
    }
    this.emitSelectedRows();
  }
  
  isRowSelected(row: any): boolean {
    return this.selectedRows.has(row);
  }
  
  emitSelectedRows() {
    this.selectedRowsChange.emit(Array.from(this.selectedRows));
  }
  
  isAllVisibleRowsSelected(): boolean {
    if (this.paginatedData.length === 0) return false;
    return this.paginatedData.every(row => this.selectedRows.has(row));
  }
}
