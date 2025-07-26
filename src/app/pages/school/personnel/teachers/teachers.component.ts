import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { BaseComponent } from 'src/app/shared/base.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonnelService } from 'src/app/core/services/api/personnel.service';
import { TeacherService } from 'src/app/core/services/api/teacher.service';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ClassService } from 'src/app/core/services/api/class.service';
import { ClassSectionService } from 'src/app/core/services/api/class-section.service';
import { SubjectService } from 'src/app/core/services/api/subject.service';
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent extends BaseComponent implements OnInit{
 breadCrumbItems!: Array<{}>;
 submitted: boolean = false;
 employees: any = [];
 teachers: any = [];
 teachersToDisplay: any = [];
 selectedTeachers: any = [];

 classes: any = [];
 subjects: any = [];
 sections: any = [];

  addTeacherForm!: UntypedFormGroup;
  teacherClassForm!: UntypedFormGroup;
  teacherSubjectForm!: UntypedFormGroup;
  get fAddTeachersForm() { return this.addTeacherForm.controls; }
  get fTeacherClassForm() { return this.teacherClassForm.controls; }
  get fTeacherSubjectForm() { return this.teacherSubjectForm.controls; }

   headers: any = [
    { key: 'familyName', displayName: 'Family Name' },
    { key: 'givenNames', displayName: 'Given Names'},
    { key: 'subjects', displayName: 'Subjects'},
    { key: 'classes', displayName: 'Classes'},
    { key: 'sections', displayName: 'Sections'}
  ];

  constructor(
    private modalService: NgbModal,
    private personnelService: PersonnelService,
    private teacherService: TeacherService,
    private classService: ClassService,
    private sectionService: ClassSectionService,
    private subjectService: SubjectService,
    private addTeacherFormBuilder: UntypedFormBuilder,
    private teacherClassFormBuilder: UntypedFormBuilder,
    private teacherSubjectFormBuilder: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>) {
      super(store);
    }

    ngOnInit(): void {
      this.breadCrumbItems = [{label: 'Personnel'},{ label: 'Teachers', active: true }];

      this.addTeacherForm = this.addTeacherFormBuilder.group({
          ids: [null, [Validators.required]],
      });

      this.teacherClassForm = this.teacherClassFormBuilder.group({
          teacherIds: [null, [Validators.required]],
          classSectionIds: [null],
          classIds: [null, [Validators.required]],
      });

      this.teacherSubjectForm = this.teacherSubjectFormBuilder.group({
         subjectIds: [null, [Validators.required]],
         teacherIds: [null, [Validators.required]],
      });
      
      this.getEmployees();
      this.getTeachers();
      this.getClasses();
      this.getSections();
      this.getSubjects();
    }

    onSubmitAddTeacher() {
      this.submitted = true;
      if (this.addTeacherForm.invalid) {
        return;
      }

      this.toggleLoading();
       this.teacherService.addTeachers(this.addTeacherForm.value).pipe(
            finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getTeachers();
                this.getEmployees();
                this.dismissModal();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
    }



  onSubmitTeacherClasses(isDelete: boolean = false) {
      this.submitted = true;
      if (this.teacherClassForm.invalid) {
        return;
      }

      this.toggleLoading();
      if(isDelete){
        this.teacherService.deleteTeacherClasses(this.teacherClassForm.value).pipe(
          finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getTeachers();
                this.dismissModal();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
      }else{
        this.teacherService.addTeacherClasses(this.teacherClassForm.value).pipe(
          finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getTeachers();
                this.dismissModal();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {
              SimpleAlerts.showError(getErrorMessage(error));
            },
        });
      }
    }

    onSubmitTeacherSubjects(isDelete: boolean = false) {
      this.submitted = true;
      if (this.teacherSubjectForm.invalid) {
        return;
      }
      this.toggleLoading();

      if(isDelete){
        this.teacherService.removeTeacherSubjects(this.teacherSubjectForm.value).pipe(
          finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getTeachers();
                this.dismissModal();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {
              SimpleAlerts.showError(getErrorMessage(error));
            },
        });
      }else{
        this.teacherService.addTeacherSubjects(this.teacherSubjectForm.value).pipe(
          finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getTeachers();
                this.dismissModal();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {
              SimpleAlerts.showError(getErrorMessage(error));
            },
        });
      }
    }

  addModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, {...this.lgModalConfig, backdrop: 'static'});
  }

  teacherSubjectModal(content: any) {
    this.teacherSubjectForm.patchValue({
      teacherIds: this.selectedTeachers.map((teacher: any) => teacher.id),
    });
    this.submitted = false;
    this.modalService.open(content, {...this.lgModalConfig, backdrop: 'static'});
  }

  teacherClassModal(content: any) {
    this.teacherClassForm.patchValue({
      teacherIds: this.selectedTeachers.map((teacher: any) => teacher.id),
    });
    this.submitted = false;
    this.modalService.open(content, {...this.lgModalConfig, backdrop: 'static'});
  }

  deleteTeacher(teacher: any) {
    SimpleAlerts.confirmDeleteDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        this.teacherService.deleteTeacher({ ids: [teacher.id] })
        .pipe(finalize(() => { this.toggleLoading();})).subscribe({
            next: (response) => {
              if (response.success) {
                this.getTeachers();
                this.dismissModal();
                this.getEmployees();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {
              SimpleAlerts.showError(getErrorMessage(error));
            },
          });
      } else {
      }
    });
  }

  resetForm() {
    this.addTeacherForm.reset();
    this.teacherClassForm.reset();
    this.teacherSubjectForm.reset();
  }

  selectedRowsChanged(event: any) {
     setTimeout(() => {
        this.selectedTeachers = event;
    });
  }

  getEmployees() {
      this.personnelService.getEmployeesNoneTeachers().subscribe({
        next: (response) => {
          if(response.success){ this.employees = response.data;}
        },
        error: () => {},
      });
    }

  getTeachers() {
      this.toggleLoading();
      this.teacherService.getTeachers().pipe(
        finalize(() => {this.toggleLoading()})).subscribe({
        next: (response) => {
          if(response.success)
            { 
              this.teachers = response.data;
              this.setTeachersToDisplay(this.teachers);
            }
        },
        error: () => {},
      });
    }

    setTeachersToDisplay(teachers: any[]): void {
      this.teachersToDisplay = teachers.map((teacher) => {
      const subjectsList = teacher.subjects ? teacher.subjects.map((s: any) => s.name).join(', ') : '';
      const classesList = teacher.classes ? teacher.classes.map((c: any) => c.name).join(', ') : '';
      const sections = teacher.sections ? teacher.sections.map((s: any) => s.name).join(', ') : '';
          return {
            id: teacher.id,
            familyName: teacher.personnel?.familyName || '#',
            givenNames: teacher.personnel?.givenNames || '#',
            subjects: subjectsList, 
            classes: classesList,
            sections: sections
          };
        });
      }

  dismissModal() {
      this.modalService.dismissAll();
      this.resetForm();
    }

  getSubjects(){
    this.subjectService.getSubjects().subscribe({
      next: (response) => {this.subjects = response.data;},
      error: (error) => {}
    });
  }

   getClasses() {
      this.classService.getClasses().subscribe({
        next: (response) => {
          if(response.success){ this.classes = response.data;}
        },
        error: () => {},
      });
    }

    getSections() {
      this.sectionService.getClassSections().subscribe({
        next: (response) => {
          if(response.success){ this.sections = response.data;}
        },
        error: () => {},
      });
    }
}
