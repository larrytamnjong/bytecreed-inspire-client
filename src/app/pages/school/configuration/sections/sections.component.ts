import { Component, OnInit   } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { ClassSectionService } from 'src/app/core/services/api/class-section.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { ClassSection } from 'src/app/core/Models/api/class-section';
@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss'
})
export class SectionsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false;
  submitted: boolean = false;
  classSections: any = [];

  classSectionForm!: UntypedFormGroup;
  isCreateMode: boolean = true;
  get form() {return this.classSectionForm.controls;}

  constructor(
    private modalService: NgbModal, 
    private classSectionService: ClassSectionService,
    private classSectionFormBuilder: UntypedFormBuilder
  ) {}


  headers = [
    { key: 'name', displayName: 'Name' },
  ];

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
    this.modalService.open(content, { size: 'md', centered: true });
  }

  editModal(content: any, classSection: ClassSection) {
    this.isCreateMode = false; 
    this.submitted = false;
    this.classSectionForm.setValue({...classSection});
    this.modalService.open(content, { size: 'md', centered: true });
  }

  getClassSections() {
    this.toggleLoading();
    this.classSectionService.getClassSections().pipe(
      finalize(() => {this.loading = false;})
    ).subscribe({
      next: (response) => {
        if(response.success){
        this.classSections = response.data;
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
    
    this.modalService.dismissAll();

    if(this.isCreateMode){
      this.classSectionService.addClassSection(this.classSectionForm.value).pipe(
        finalize(() => {this.toggleLoading(); this.reset();})
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
      SimpleAlerts.confirmDialog().then((result) => {
        if (result) {
          this.classSectionService.updateClassSection(this.classSectionForm.value).pipe(
            finalize(() => {this.toggleLoading(); this.reset();})
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
      });
    }
  }

  dismissModal() {
    this.modalService.dismissAll();
    this.reset();
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
