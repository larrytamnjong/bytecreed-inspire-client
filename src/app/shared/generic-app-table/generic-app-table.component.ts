import { Component, Input, Output, EventEmitter, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'generic-app-table',
  templateUrl: './generic-app-table.component.html',
  styleUrl: './generic-app-table.component.scss'
})
export class GenericAppTableComponent implements OnChanges {
  @Input() headers: { key: string; displayName: string }[] = [];
  @Input() data: any[] = [];
  @Input() clickableColumns: string[] = []; 
  @Output() rowClicked = new EventEmitter<any>();
  @Input() showActions: boolean = false;
  @Input() showEdit: boolean = true;
  @Input() showDelete: boolean = true;
  @Output() editClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  @Input() tableId: string = 'default'; 
  @Input() showRowSelect: boolean = false;
  @Output() selectedRowsChange = new EventEmitter<any[]>();
  @Input() customTemplates: { [key: string]: TemplateRef<any> } = {};

  selectedRows = new Set<any>();
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: boolean = true; 
  currentPage: number = 0;
  pageSize: number = 5; 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.selectedRows.clear();
      this.emitSelectedRows(); 
    }
  }

  onRowClick(row: any) {
    this.rowClicked.emit(row);
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
    return this.data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
      )
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
