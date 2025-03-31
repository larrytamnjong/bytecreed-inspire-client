import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { ClassService } from 'src/app/core/services/api/class.service';
import { PaginationService } from 'src/app/core/services/general/pagination.service';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss'
})
export class SectionsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false;
  submitted: boolean = false;
  searchTerm: any;
  searchResults: any;
  classSections: any = [];
  classSectionsCopy: any = [];

  constructor(
    private modalService: NgbModal, 
    public paginationService: PaginationService, 
    private classService: ClassService 
  ) {}

  ngOnInit(): void {
      this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Sections', active: true }];
      this.getClassSections();
  }

  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  performSearch(): void {
    this.searchResults = this.classSections?.filter((item: any) => {
      return (
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.classSectionsCopy = this.paginationService?.changePage(this.searchResults)
  }

  onSort(column: any) {
    this.classSectionsCopy = this.paginationService.onSort(column, this.classSectionsCopy)
  }

  changePage() {
    this.classSections = this.paginationService?.changePage(this.classSections)
  }

  getClassSections() {
    this.toggleLoading();
    this.classService.getClassSections().pipe(
      finalize(() => {this.loading = false;})
    ).subscribe({
      next: (response) => {
        if(response.success){
        this.classSectionsCopy = response.data;
        this.classSections = cloneDeep(response.data);
        this.classSectionsCopy = this.paginationService.changePage(this.classSections)
        }
      },
      error: (error) => {},
    });
  }

  toggleLoading() {
    this.loading = !this.loading;
  } 

}
