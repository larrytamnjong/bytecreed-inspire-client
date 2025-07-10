import { Component, OnInit } from '@angular/core';
import { AcademicTerm } from 'src/app/core/Models/api/academics';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';

@Component({
  selector: 'app-academic-terms',
  templateUrl: './academic-terms.component.html',
  styleUrl: './academic-terms.component.scss'
})
export class AcademicTermsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  submitted: boolean = false;

  academicTerms: AcademicTerm[] | undefined | any = [];
  academicTermForm!: UntypedFormGroup;
  isCreateMode: boolean = true;
  get form() {return this.academicTermForm.controls;}

  headers: any = [
    { key: 'name', displayName: 'Name' }
  ]

constructor(
  private modalService: NgbModal, 
  private academicFormBuilder: UntypedFormBuilder, 
  private academicService: AcademicService,
  protected override store: Store<{ data: RootReducerState }>
  
) {
  super(store);
 }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Academics'}, { label: 'Academic Terms', active: true }];

    this.academicTermForm = this.academicFormBuilder.group({
      id: [null],
      name: ['',[Validators.required]],
    });

    this.getAcademicTerms();
 }

  addModal(content: any) {
    this.isCreateMode = true;
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  editModal(content: any, academicTerm: AcademicTerm) {
    this.isCreateMode = false;
    this.submitted = false;
    this.academicTermForm.setValue({...academicTerm});
    this.modalService.open(content, { size: 'md', centered: true });
  }

  getAcademicTerms() {
    this.toggleLoading();
    this.academicService.getAcademicTerms().pipe(finalize(() => this.toggleLoading()))
      .subscribe({
        next: (response) => {
          this.academicTerms = response.data;
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.academicTermForm.invalid) {
      return;
    }
    
    this.modalService.dismissAll();

    if(this.isCreateMode){
      this.toggleLoading();
      this.academicService.createAcademicTerm(this.academicTermForm.value).pipe(
        finalize(() => {this.toggleLoading(); this.reset();})
      ).subscribe({
        next: (response) => {
          if(response.success){
            this.getAcademicTerms();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
    }else{
      SimpleAlerts.confirmDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.academicService.updateAcademicTerm(this.academicTermForm.value).pipe(
            finalize(() => {this.toggleLoading(); this.reset();})
          ).subscribe({
            next: (response) => {
              if(response.success){
                this.getAcademicTerms();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
          })
        }else{
          return;
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
    this.academicTermForm.reset();
  }


}
