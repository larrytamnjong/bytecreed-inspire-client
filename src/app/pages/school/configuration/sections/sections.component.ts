import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { ClassService } from 'src/app/core/services/api/class.service';
import { PaginationService } from 'src/app/core/services/general/pagination.service';
import { cloneDeep } from 'lodash';
import { UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
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
  classSectionForm!: UntypedFormGroup;
  isCreateMode: boolean = true;
  get form() {return this.classSectionForm.controls;}

  constructor(
    private modalService: NgbModal, 
    public paginationService: PaginationService, 
    private classService: ClassService,
    private classSectionFormBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
      this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Sections', active: true }];

      this.classSectionForm = this.classSectionFormBuilder.group({
        id: [null],
        name: ['',[Validators.required]],
      });

      this.getClassSections();
  }

  addModal(content: any) {
    this.isCreateMode = true;
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  editModal(content: any, id: any) {
    this.isCreateMode = false; 
    this.submitted = false;
    var classSection = this.classSections.find((x: any) => x.id === id)
    this.classSectionForm.setValue({...classSection});
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

  onSubmit() {
    this.toggleLoading();
    this.submitted = true;
    if (this.classSectionForm.invalid) {
      this.toggleLoading();
      return;
    }
    
    this.dismissModal();
    this.reset();

    if(this.isCreateMode){
      this.classService.addClassSection(this.classSectionForm.value).pipe(
        finalize(() => {this.toggleLoading();})
      ).subscribe({
        next: (response) => {
          if(response.success){
            this.getClassSections();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
    }else{
      this.classService.updateClassSection(this.classSectionForm.value).pipe(
        finalize(() => {this.toggleLoading();})
      ).subscribe({
        next: (response) => {
          if(response.success){
            this.getClassSections();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      })
    }
  }

  dismissModal() {
    this.modalService.dismissAll();
  }

  reset() {
    this.submitted = false;
    this.isCreateMode = true;
    this.classSectionForm.reset();
  }

  toggleLoading() {
    this.loading = !this.loading;
  } 

}
