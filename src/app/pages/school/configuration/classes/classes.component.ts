import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { ClassService } from 'src/app/core/services/api/class.service';
import { Class } from 'src/app/core/Models/api/class';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ExamTypeService } from 'src/app/core/services/api/exam-type.service';
import { ExamType } from 'src/app/core/Models/api/exam-types';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;


  //Class
  submittedClass: boolean = false;
  classes: any = [];
  classForm!: UntypedFormGroup;
  isClassCreateMode: boolean = true;
  get classF() {return this.classForm.controls;}
  classHeaders = [
    { key: 'name', displayName: 'Name' },
    { key: 'isActive', displayName: 'Status' },
    { key: 'nextClassName', displayName: 'Next Class' },
    { key: 'previousClassName', displayName: 'Previous Class' },
  ];

  //Class Exam Type
  submittedClassExamType: boolean = false;
  submitDeleteClassExamType: boolean = false;
  classExamTypes: any = [];
  examTypes: any | ExamType[] = [];
  classId: any | null = null;
  classExamTypeForm!: UntypedFormGroup;
  classExamTypeDeleteForm!: UntypedFormGroup;
  get classExamTypeF() {return this.classExamTypeForm.controls;}
  get classExamTypeDeleteF() {return this.classExamTypeDeleteForm.controls;}
  classExamTypeHeaders = [
    { key: 'examTypeId', displayName: 'Exam Type' },
    { key: 'isActive', displayName: 'Status' },
    { key: 'overrideDefaultWeight', displayName: 'Override Default Weight' },
    { key: 'weight', displayName: 'Weight' },
  ]

  constructor(
    private modalService: NgbModal,
    private classService: ClassService,
    private examTypeService: ExamTypeService,
    private classFormBuilder: UntypedFormBuilder,
    private classExamTypeFormBuilder: UntypedFormBuilder,
    private classExamTypeFormBuilderDelete: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Classes', active: true }];

    this.classForm = this.classFormBuilder.group({
      id: [null],
      name: [null,[Validators.required]],
      nextClassId: [null],
      previousClassId: [null],
      isActive: [true, [Validators.required]],
      classGroupId: [null],
      sortOrder: [null],
    });


    this.classExamTypeForm = this.classExamTypeFormBuilder.group({
      id: [null],
      examTypeId: [null,[Validators.required]],
      weight: [null],
      overrideDefaultWeight: [null, [Validators.required]],
      isActive: [true, [Validators.required]],
      classIds: [null, [Validators.required]],
    });

    this.classExamTypeDeleteForm = this.classExamTypeFormBuilderDelete.group({
      examTypeId: [null,[Validators.required]],
      classIds: [null, [Validators.required]],
    });

    this.classExamTypeForm.get('overrideDefaultWeight')?.valueChanges.subscribe((overrideDefaultWeight: boolean) => {
      const weightControl = this.classExamTypeForm.get('weight');
  
      if (overrideDefaultWeight === true) {
        weightControl?.setValidators([Validators.required]);
        weightControl?.enable();
      } else {
        weightControl?.clearValidators();
        weightControl?.setValue(null); 
        weightControl?.disable();
      }
  
      weightControl?.updateValueAndValidity();
    });

    this.loadData();
  }

    //Class
    addClassModal(content: any) {
      this.isClassCreateMode = true;
      this.submittedClass = false;
      this.modalService.open(content, { size: 'md', centered: true });
    }
  
    editClassModal(content: any, _class: Class) {
      this.isClassCreateMode = false; 
      this.submittedClass = false;
      var data = {
                id: _class.id, 
                 name: _class.name, 
                 nextClassId: _class.nextClassId, 
                 previousClassId: _class.previousClassId, 
                 isActive: _class.isActive, 
                 classGroupId: _class.classGroupId, 
                 sortOrder: _class.sortOrder
                }
      this.classForm.setValue(data);
      this.modalService.open(content, { size: 'md', centered: true });
    }

    deleteClass(_class: Class) {
      SimpleAlerts.confirmDeleteDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.classService.deleteClass(_class.id!).pipe(
            finalize(() => {this.toggleLoading();})
          ).subscribe({
            next: (response) => {
              if(response.success){
                this.getClasses();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
          });
        }
      });
    }

    onSubmitClass() {
      this.toggleLoading();
      this.submittedClass = true;
      if (this.classForm.invalid) {
        this.toggleLoading();
        return;
      }
      
      this.modalService.dismissAll();
  
      if(this.isClassCreateMode){
        this.classService.addClass(this.classForm.value).pipe(
          finalize(() => {this.toggleLoading(); this.resetClassForm();})).subscribe({
          next: (response) => {
            if(response.success){
              this.getClasses();
              SimpleAlerts.showSuccess();
            }
          },
          error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
      }else{
        SimpleAlerts.confirmDialog().then((result) => {
          if (result) {
            this.classService.updateClass(this.classForm.value).pipe(
              finalize(() => {this.toggleLoading(); this.resetClassForm();})).subscribe({
              next: (response) => {
                if(response.success){
                  this.getClasses();
                  SimpleAlerts.showSuccess();
                }
              },
              error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
            })
          }
        });
      }
    }

    getClasses() {
      this.toggleLoading();
      this.classService.getClasses().pipe(
        finalize(() => {this.loading = false;})).subscribe({
        next: (response) => {
          if(response.success){ this.classes = response.data;}
        },
        error: () => {},
      });
    }

    resetClassForm() {
      this.submittedClass = false;
      this.isClassCreateMode = true;
      this.classForm.reset();
    }

    dismissClassModal() {
      this.modalService.dismissAll();
      this.resetClassForm();
    }

  // Class Exam Type
  addClassExamTypeModal(content: any) {
    this.submittedClass = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  deleteClassExamTypeModal(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }

  public onSelectAllClasses() {
    const selected = this.classes.map((item: Class) => item.id);
    this.classExamTypeForm.get('classIds')?.patchValue(selected);
  }

  public onSelectAllClassesForDelete() {
    const selected = this.classes.map((item: Class) => item.id);
    this.classExamTypeDeleteForm.get('classIds')?.patchValue(selected);
  }

  onSubmitDeleteClassExamType(){
    this.toggleLoading();
    this.submitDeleteClassExamType = true;
    if (this.classExamTypeDeleteForm.invalid) {
      this.toggleLoading();
      return; 
    }

    this.modalService.dismissAll();

    this.classService.deleteClassExamType(this.classExamTypeDeleteForm.get('examTypeId')?.value, (this.classExamTypeDeleteForm.get('classIds')?.value)).pipe(
      finalize(() => {this.toggleLoading(); this.resetClassExamTypeForm();})).subscribe({
      next: (response) => {
        if(response.success){
          SimpleAlerts.showSuccess();
        }
      },
      error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
    });
  }

  onSubmitAddClassExamType() {
    this.toggleLoading();
    this.submittedClassExamType = true;
    if (this.classExamTypeForm.invalid) {
      this.toggleLoading();
      return;
    }
    
    this.modalService.dismissAll();

      this.classService.addClassExamType(this.classExamTypeForm.value).pipe(
        finalize(() => {this.toggleLoading(); this.resetClassExamTypeForm();})).subscribe({
        next: (response) => {
          if(response.success){
            this.getClassExamTypes();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
  }

  getClassExamTypes(){
    this.classExamTypes = [];
    if(this.classId == null){
      return;
    }
    this.toggleLoading();
    this.classService.getClassExamTypes(this.classId).pipe(
      finalize(() => {this.toggleLoading();})).subscribe({
      next: (response) => {
        if(response.success){
          this.classExamTypes = response.data;
        }
      },
      error: () => {},
    });
  }

  getExamTypeName(examTypeId: string): string {
    const name = this.examTypes?.find((item : ExamType) => item.id === examTypeId)?.name;
    return name?? '';
  }


  dismissClassExamTypeModal() {
    this.modalService.dismissAll();
    this.resetClassExamTypeForm();
  }

  resetClassExamTypeForm() {
    this.submittedClassExamType = false;
    this.submitDeleteClassExamType = false;
    this.classExamTypeForm.reset();
    this.classExamTypeDeleteForm.reset();
  }

  // General
  loadData(){
    this.getLookUps();
    this.getClasses();
    this.getExamtypes();
  }

  getExamtypes() {
    this.examTypeService.getExamTypes().subscribe({
        next: (response) => {
          this.examTypes = response.data;
        },
        error: (error) => {}
      });
  }

}
