import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { ClassService } from 'src/app/core/services/api/class.service';
import { Class, ClassSubject } from 'src/app/core/Models/api/class';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ExamTypeService } from 'src/app/core/services/api/exam-type.service';
import { ExamType } from 'src/app/core/Models/api/exam-types';
import { BaseComponent } from 'src/app/shared/base.component';
import { SubjectService} from 'src/app/core/services/api/subject.service';
import { Subject } from 'src/app/core/Models/api/subject';

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
  submittedDeleteClassExamType: boolean = false;
  classExamTypes: any = [];
  examTypes: any | ExamType[] = [];
  classExamType_classId: any | null = null;
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

  //Class Subjects 
  submittedClassSubject: boolean = false;
  submittedDeleteClassSubject: boolean = false;
  classSubjects: any = [];
  subjects: any = [];
  classSubject_classId: any | null = null;
  classSubjectForm!: UntypedFormGroup;
  classSubjectDeleteForm!: UntypedFormGroup;
  get classSubjectF() {return this.classSubjectForm.controls;}
  get classSubjectDeleteF() {return this.classSubjectDeleteForm.controls;}
  classSubjectHeaders = [
    { key: 'subjectId', displayName: 'Subject' },
    { key: 'isActive', displayName: 'Status' },
    { key: 'overrideDefaultCoefficient', displayName: 'Override Coefficient'},
    { key: 'coefficient', displayName: 'Coefficient' },
    { key: 'isRequired', displayName: 'Is Required'},
  ]
  
  constructor(
    private modalService: NgbModal,
    private classService: ClassService,
    private examTypeService: ExamTypeService,
    private classFormBuilder: UntypedFormBuilder,
    private classExamTypeFormBuilder: UntypedFormBuilder,
    private classExamTypeFormBuilderDelete: UntypedFormBuilder,
    private subjectService: SubjectService,
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
      academicYearId: [null],
      staticId: [null]
    });


    this.classExamTypeForm = this.classExamTypeFormBuilder.group({
      id: [null],
      examTypeId: [null,[Validators.required]],
      weight: [null],
      overrideDefaultWeight: [false, [Validators.required]],
      isActive: [true, [Validators.required]],
      classIds: [null, [Validators.required]],
      academicYearId: [null],
      staticId: [null]
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


     this.classSubjectForm = this.classFormBuilder.group({
        id: [null],
        subjectId: [null,[Validators.required]],
        coefficient: [null],
        overrideDefaultCoefficient: [false, [Validators.required]],
        isActive: [true, [Validators.required]],
        classIds: [null, [Validators.required]],
        isRequired: [null, [Validators.required] ],
        academicYearId: [null],
        staticId: [null]  
      });

      this.classSubjectDeleteForm = this.classFormBuilder.group({
        subjectId: [null,[Validators.required]],
        classIds: [null, [Validators.required]],
      });

      this.classSubjectForm.get('overrideDefaultCoefficient')?.valueChanges.subscribe((overrideDefaultCoefficient: boolean) => {
        const coefficientControl = this.classSubjectForm.get('coefficient');

        if (overrideDefaultCoefficient === true) {
          coefficientControl?.setValidators([Validators.required]);
          coefficientControl?.enable();
        } else {
          coefficientControl?.clearValidators();
          coefficientControl?.setValue(null);
          coefficientControl?.disable();
        }
      });

    this.loadData();
  }

    //Class
    addClassModal(content: any) {
      this.classExamTypeForm.get('weight')?.disable();
      this.isClassCreateMode = true;
      this.submittedClass = false;
      this.modalService.open(content, this.mdModalConfig);
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
                 sortOrder: _class.sortOrder,
                academicYearId: _class.academicYearId,
                staticId: _class.staticId
                }
      this.classForm.setValue(data);
      this.modalService.open(content, this.mdModalConfig);
    }

    deleteClass(_class: Class) {
      SimpleAlerts.confirmDeleteDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.classService.deleteClass(_class.id!).pipe(finalize(() => {this.toggleLoading();})).subscribe({
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
          }else{
            this.toggleLoading();
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
      this.classForm.patchValue({isActive: true});
    }

    dismissClassModal() {
      this.modalService.dismissAll();
      this.resetClassForm();
    }

  // Class Exam Type
  addClassExamTypeModal(content: any) {
    this.submittedClassExamType = false;
    this.modalService.open(content, this.mdModalConfig);
  }

  deleteClassExamTypeModal(content: any) {
    this.modalService.open(content, this.mdModalConfig);
  }

  public classExamType_onSelectAllClasses() {
    const selected = this.classes.map((item: Class) => item.id);
    this.classExamTypeForm.get('classIds')?.patchValue(selected);
  }

  public classExamType_onSelectAllClassesForDelete() {
    const selected = this.classes.map((item: Class) => item.id);
    this.classExamTypeDeleteForm.get('classIds')?.patchValue(selected);
  }

  onSubmitDeleteClassExamType(){
    this.toggleLoading();
    this.submittedDeleteClassExamType = true;
    if (this.classExamTypeDeleteForm.invalid) {
      this.toggleLoading();
      return; 
    }

    this.modalService.dismissAll();

    this.classService.deleteClassExamType(this.classExamTypeDeleteForm.get('examTypeId')?.value, (this.classExamTypeDeleteForm.get('classIds')?.value)).pipe(
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
    if(this.classExamType_classId == null){
      return;
    }

    this.toggleLoading();
    this.classService.getClassExamTypes(this.classExamType_classId).pipe(
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
    return name ?? '';
  }

  dismissClassExamTypeModal() {
    this.modalService.dismissAll();
    this.resetClassExamTypeForm();
  }

  resetClassExamTypeForm() {
    this.submittedClassExamType = false;
    this.submittedDeleteClassExamType = false;
    this.classExamTypeForm.reset();
    this.classExamTypeDeleteForm.reset();
    this.classExamTypeForm.patchValue({weight: null, isActive: true, overrideDefaultWeight: false});
  }

  // Class Subject
  addClassSubjectModal(content: any) {
    this.submittedClassSubject = false;
    this.modalService.open(content, this.mdModalConfig);
  }

  deleteClassSubjectModal(content: any) {
    this.modalService.open(content, this.mdModalConfig);
  }

  editClassSubjectModal(content: any, classSubject: ClassSubject) {
    this.submittedClassSubject = false;
    var data = {
      id: null,
      subjectId: classSubject.subjectId,
      coefficient: classSubject.coefficient,
      overrideDefaultCoefficient: classSubject.overrideDefaultCoefficient,
      isActive: classSubject.isActive,
      classIds: [classSubject.classId],
      isRequired: classSubject.isRequired,
      academicYearId: classSubject.academicYearId,
      staticId: classSubject.staticId
    };
    this.classSubjectForm.setValue(data);
    this.modalService.open(content, this.mdModalConfig);
  }

  public classSubject_onSelectAllClasses() {
    const selected = this.classes.map((item: Class) => item.id);
    this.classSubjectForm.get('classIds')?.patchValue(selected);
  }

  public classSubject_onSelectAllClassesForDelete() {
    const selected = this.classes.map((item: Class) => item.id);
    this.classSubjectDeleteForm.get('classIds')?.patchValue(selected);
  }

  onSubmitDeleteClassSubject(){
    this.toggleLoading();
    this.submittedDeleteClassSubject = true;
    if (this.classSubjectDeleteForm.invalid) {
      this.toggleLoading();
      return; 
    }

    this.modalService.dismissAll();

    this.classService.deleteClassSubject(this.classSubjectDeleteForm.get('subjectId')?.value, (this.classSubjectDeleteForm.get('classIds')?.value)).pipe(
      finalize(() => {this.toggleLoading(); this.resetClassSubjectForm();})).subscribe({
      next: (response) => {
        if(response.success){
          this.getClassSubjects();
          SimpleAlerts.showSuccess();
        }
      },
      error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
    });
  }

  deleteClassSubject(classSubject: ClassSubject){
    SimpleAlerts.confirmDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        this.classService.deleteClassSubject(classSubject.subjectId, [classSubject.classId]).pipe(
          finalize(() => {this.toggleLoading();})).subscribe({
          next: (response) => {
            if(response.success){
              this.getClassSubjects();
              SimpleAlerts.showSuccess();
            }
          },
          error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
      }
    });
  }

  onSubmitAddClassSubject() {
    this.toggleLoading();
    this.submittedClassSubject = true;
    if (this.classSubjectForm.invalid) {
      this.toggleLoading();
      return;
    }
    
    this.modalService.dismissAll();

      this.classService.updateOrAddClassesSubjects(this.classSubjectForm.value).pipe(
        finalize(() => {this.toggleLoading(); this.resetClassSubjectForm();})).subscribe({
        next: (response) => {
          if(response.success){
            this.getClassSubjects();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
  }

  getClassSubjects(){
    this.classSubjects = [];
    if(this.classSubject_classId == null){
      return;
    }

    this.toggleLoading();
    this.classService.getClassSubjects(this.classSubject_classId).pipe(
      finalize(() => {this.toggleLoading();})).subscribe({
      next: (response) => {
        if(response.success){
          this.classSubjects = response.data;
        }
      },
      error: () => {},
    });
  }

  getClassSubjectName(subjectId: string): string {
    const name = this.subjects?.find((item : Subject) => item.id === subjectId)?.name;
    return name ?? '';
  }

  dismissClassSubjectModal() {
    this.modalService.dismissAll();
    this.resetClassSubjectForm();
  }

  resetClassSubjectForm() {
    this.submittedClassSubject = false;
    this.submittedDeleteClassSubject = false;
    this.classSubjectForm.reset();
    this.classSubjectDeleteForm.reset();
    this.classSubjectForm.patchValue({coefficient: null, isActive: true, overrideDefaultCoefficient: false});
  }

  // General
  loadData(){
    this.getLookUps();
    this.getClasses();
    this.getExamtypes();
    this.getSubjects();
  }

  getExamtypes() {
    this.examTypeService.getExamTypes().subscribe({
        next: (response) => {this.examTypes = response.data;},
        error: (error) => {}
      });
  }

  getSubjects(){
    this.subjectService.getSubjects().subscribe({
      next: (response) => {this.subjects = response.data;},
      error: (error) => {}
    });
  }

}
