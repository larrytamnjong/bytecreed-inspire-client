import { Component, Input, Output, EventEmitter, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'generic-paginated-app-table',
  templateUrl: './generic-paginated-app-table.component.html',
  styleUrls: ['./generic-paginated-app-table.component.scss']
})
export class GenericPaginatedAppTableComponent implements OnChanges {
  @Input() headers: { key: string; displayName: string }[] = [];
  @Input() apiUrl: string = '';
  @Input() isIdentityApi: boolean = false;
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
  @Input() reload: any;

  selectedRows = new Set<string>();
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: boolean = true; 
  currentPage: number = 0;
  pageSize: number = 5;
  
  data: any[] = [];
  filteredData: any[] = [];
  totalRecords: number = 0;
  totalPages: number = 0;
  loading: boolean = false;


  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reload']) {
      this.loadData();
      this.selectedRows.clear();
      this.emitSelectedRows();
    }
  }

  loadData() {
    if (!this.apiUrl) return;

    this.loading = true;
    let queryParams = new HttpParams();
  
    if (this.searchTerm) {
      queryParams = queryParams.set('keyword', this.searchTerm);
    }

    const requestBody = {
      pageNumber: this.currentPage + 1,
      pageSize: this.pageSize
    };

    this.http.post<any>(`${this.isIdentityApi ? environment.IDENTITY_SERVER_URL : environment.API_SERVER_URL}/${this.apiUrl}`, requestBody, { params: queryParams }).subscribe({
      next: (response) => {
        if (response.success) {
          this.data = response.data;
          this.filteredData = [...response.data]; 
          this.totalRecords = response.totalRecords;
          this.totalPages = response.totalPages;
          this.pageSize = response.pageSize;
          this.currentPage = response.pageNumber - 1;
          
        } else {
          this.data = [];
          this.filteredData = [];
          this.totalRecords = 0;
          this.totalPages = 0;
          this.pageSize = 5;
        }
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    });
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

  get paginatedData() {
    return this.filteredData;
  }

  onRowClick(row: any) {
    this.rowClicked.emit(row);
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadData();
    }
  }

  onPageSizeChange(event: Event) {
    this.pageSize = Number((event.target as HTMLSelectElement).value);
    this.currentPage = 0;
    this.loadData();
  }

  onSearchChange() {
    this.currentPage = 0;
    this.loadData();
  }

  toggleRowSelection(row: any) {
    const rowId = row.id; 
    if (this.selectedRows.has(rowId)) {
      this.selectedRows.delete(rowId);
    } else {
      this.selectedRows.add(rowId);
    }
    this.emitSelectedRows();
  }
  
  toggleSelectAllRows(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const currentPageData = this.paginatedData;
  
    currentPageData.forEach(row => {
      const rowId = row.id;
      if (checked) {
        this.selectedRows.add(rowId);
      } else {
        this.selectedRows.delete(rowId);
      }
    });
  
    this.emitSelectedRows();
  }

  isRowSelected(row: any): boolean {
    return this.selectedRows.has(row.id);
  }
  
  emitSelectedRows() {
    this.selectedRowsChange.emit(Array.from(this.selectedRows));
  }
  
  isAllVisibleRowsSelected(): boolean {
    if (this.paginatedData.length === 0) return false;
    return this.paginatedData.every(row => this.selectedRows.has(row.id));
  }

}