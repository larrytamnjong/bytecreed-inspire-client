import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { SubjectService } from 'src/app/core/services/api/subject.service';
import { Subject } from 'src/app/core/Models/api/subject';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  submitted: boolean = false;

  subjects: Subject[] | undefined | any = [];
  isCreateMode: boolean = true;
  subjectForm!: UntypedFormGroup;

  get form() {return this.subjectForm.controls;}
  
    headers: any = [
      { key: 'name', displayName: 'Name' },
      { key: 'description', displayName: 'Description' },
      { key: 'isActive', displayName: 'Status' },
      { key: 'coefficient', displayName: 'Coefficient' },
      { key: 'code', displayName: 'Code' },
    ]

  constructor(
      private modalService: NgbModal,
      private subjectService: SubjectService,
      private subjectFormBuilder: UntypedFormBuilder,
      protected override store: Store<{ data: RootReducerState }>) { 
      super(store);
    }

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Configuration'},{ label: 'Subject', active: true }];

    this.subjectForm = this.subjectFormBuilder.group({
        id: [null],
        name: [null,[Validators.required]],
        isActive: [true, [Validators.required]],
        description: [null],
        coefficient: [0, [Validators.required]],
        code: [null],
    });

    this.getLookUps();
    this.getSubjects();
  }

  addModal(content: any) {
    this.isCreateMode = true;
    this.submitted = false;
    this.modalService.open(content, this.mdModalConfig);
  }

  editModal(content: any, subject: Subject) {
      this.isCreateMode = false;
      this.submitted = false;
      this.subjectForm.setValue(subject);
      this.modalService.open(content, this.mdModalConfig);
    }
  
   getSubjects() {
      this.toggleLoading();
      this.subjectService.getSubjects().pipe(finalize(() => this.toggleLoading())).subscribe({
          next: (response) => {
            this.subjects = response.data;
          },
          error: (error) => {
            SimpleAlerts.showError(getErrorMessage(error));
          }
        });
    }

    onSubmit() {
      this.submitted = true;
      if (this.subjectForm.invalid) {
        this.toggleLoading();
        return;
      }
      
      this.modalService.dismissAll();
  
      if(this.isCreateMode){
      this.toggleLoading();
        this.subjectService.addSubject(this.subjectForm.value).pipe(
          finalize(() => {this.toggleLoading(); this.reset();})).subscribe({
          next: (response) => {
            if(response.success){
              this.getSubjects();
              SimpleAlerts.showSuccess();
            }
          },
          error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
      }else{
        SimpleAlerts.confirmDialog().then((result) => {
          if (result) {
            this.toggleLoading();
            this.subjectService.updateSubject(this.subjectForm.value).pipe(
              finalize(() => {this.toggleLoading(); this.reset();})).subscribe({
              next: (response) => {
                if(response.success){
                  this.getSubjects();
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
    this.subjectForm.reset();
    this.subjectForm.patchValue({coefficient: 0, isActive: true});
  }
}
