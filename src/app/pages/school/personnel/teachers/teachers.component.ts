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
import { AcademicService } from 'src/app/core/services/api/academics.service';
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
 activeAcademicYear: any = null;

 classes: any = [];
 subjects: any = [];
 classSections: any = [];

 selectedTeacher: any = null;
 selectedTeacherSubjects: any = [];
 selectedTeacherClasses: any = [];
 selectedTeacherSections: any = [];

 selectedTeacherSelectedSubjects: any = [];
 selectedTeacherSelectedClasses: any = [];
 selectedTeacherSelectedClassSections: any = [];


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

  selectedTeacherSubjectsHeaders: any = [
    { key: 'name', displayName: 'Name' },
    { key: 'description', displayName: 'Description' },
    { key: 'code', displayName: 'Code' },
  ]

  selectedTeacherSectionHeaders: any = [
    { key: 'name', displayName: 'Name' },
  ]

  selectedTeacherClassesHeaders: any = [
    { key: 'name', displayName: 'Name' },
  ]

  constructor(
    private modalService: NgbModal,
    private personnelService: PersonnelService,
    private teacherService: TeacherService,
    private academicService: AcademicService,
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
      this.getClassSections();
      this.getSubjects();
      this.getActiveAcademicYear();
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
                SimpleAlerts.showSuccess();
                this.dismissModal();
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
                SimpleAlerts.showSuccess();
                this.dismissModal();
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
    this.modalService.open(content, {...this.mdModalConfig, backdrop: 'static'});
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
    this.submitted = false;
    this.addTeacherForm.reset();
    this.teacherClassForm.reset();
    this.teacherSubjectForm.reset();
    this.selectedTeacherSubjects = [];
    this.selectedTeacherClasses = [];
    this.selectedTeacherSections = [];
    this.selectedTeacherSelectedSubjects = [];
    this.selectedTeacherSelectedClasses = [];
    this.selectedTeacherSelectedClassSections = [];
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

   getTeacher(id: any) {
      this.toggleLoading();
      this.teacherService.getTeacher(id).pipe( finalize(() => {this.toggleLoading()})).subscribe({
        next: (response) => {
          if(response.success)
            { 
              this.setSelectedTeacherData(response.data);
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

  setSelectedTeacherData(teacher: any){
      this.selectedTeacherSubjects = teacher.subjects;
      this.selectedTeacherClasses =  teacher.classes;
      this.selectedTeacherSections = teacher.sections;
    }

  onEditClick(teacher: any, content: any){
    this.selectedTeacher = this.teachers.find((t: any) => t.id === teacher.id);
    this.setSelectedTeacherData(this.selectedTeacher);
    this.modalService.open(content, {...this.xlModalConfig, backdrop: 'static'});
  }

  dismissModal() {
    this.modalService.dismissAll();
    this.resetForm();
  }

  onSelectedTeacherSubjectsSaveClick(){
    this.toggleLoading();
    this.teacherService.addTeacherSubjects({subjectIds: this.selectedTeacherSelectedSubjects, teacherIds: [this.selectedTeacher.id]}).pipe(
      finalize(() => {this.toggleLoading();})).subscribe({
        next: (response) => {
          if(response.success){
            this.getTeacher(this.selectedTeacher.id);
            this.resetForm();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        },
    });
  }

  onSelectedTeacherSubjectDeleteClick(subject: any){
    this.toggleLoading();
    this.teacherService.removeTeacherSubjects({subjectIds: [subject.id], teacherIds: [this.selectedTeacher.id]}).pipe(
        finalize(() => {this.toggleLoading();})).subscribe({
          next: (response) => {
            if(response.success){
               this.getTeacher(this.selectedTeacher.id);
               this.resetForm();
               SimpleAlerts.showSuccess();
            }
          },
          error: (error) => {
            SimpleAlerts.showError(getErrorMessage(error));
          },
      });
  }

  onSelectedTeacherClassSaveClick(){
    this.toggleLoading();
      this.teacherService.addTeacherClasses({teacherIds: [this.selectedTeacher.id], classSectionIds: this.selectedTeacherSelectedClassSections, classIds: this.selectedTeacherSelectedClasses}).pipe(
        finalize(() => {this.toggleLoading();})).subscribe({
          next: (response) => {
            if(response.success){
               this.getTeacher(this.selectedTeacher.id);
               this.resetForm();
               SimpleAlerts.showSuccess();
            }
          },
          error: (error) => {
            SimpleAlerts.showError(getErrorMessage(error));
          },
      });
    }

  onSelectedTeacherClassDeleteClick(_class: any){
    this.toggleLoading();
     this.teacherService.deleteTeacherClasses({teacherIds: [this.selectedTeacher.id], classSectionIds: this.selectedTeacherSelectedClassSections, classIds: [_class.id]}).pipe(
          finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(response.success){
               this.getTeacher(this.selectedTeacher.id);
               this.resetForm();
               SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
    }

  dismissTeacherInfoModal(){
    this.modalService.dismissAll();
    this.selectedTeacher = null;
    this.resetForm();
    this.getTeachers();
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

  getClassSections() {
    this.sectionService.getClassSections().subscribe({
      next: (response) => {
        if(response.success){ this.classSections = response.data;}
      },
      error: () => {},
    });
  }

  getActiveAcademicYear(){
    this.academicService.getActiveAcademicYear().subscribe({
      next: (response) => {
        if(response.success){
          this.activeAcademicYear = response.data;
        }
      },
      error: (error) => {}
    });
  }
}
