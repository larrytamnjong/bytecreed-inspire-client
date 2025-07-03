import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from 'src/app/core/services/api/teacher.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/core/services/api/student.service';
import { finalize } from 'rxjs/operators';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { StudentEnrollment } from 'src/app/core/Models/api/student';
import { GradingService } from 'src/app/core/services/api/grading.service';
import { ResultService } from 'src/app/core/services/api/result.service';
import { ClassService } from 'src/app/core/services/api/class.service';
import { AcademicService } from 'src/app/core/services/api/academics.service';

@Component({
  selector: 'app-register-results',
  templateUrl: './register-results.component.html',
  styleUrl: './register-results.component.scss'
})
export class RegisterResultsComponent extends BaseComponent implements OnInit {
 breadCrumbItems!: Array<{}>;

 teacherSubjects: any = [];
 teacherClasses: any = [];
 teacherSections: any = [];
 studentEnrollments: any = [];
 academicPeriods: any = [];
 examTypes: any = [];
 scale: any = null;

 studentEnrollmentsToDisplay: any = [];
 studentsResults: any = [];

 editableConfig: {[Key: string]: any} = {
  result: {
    editable: true,
    type: 'number',
    min: 0,
    max: 20
  },
};

 getStudentForm!: UntypedFormGroup;

 get fGetStudentForm() { return this.getStudentForm.controls; }

 headers: any = [
    { key: 'admissionNumber', displayName: 'Admission Number' },
    { key: 'familyName', displayName: 'Family Name' },
    { key: 'givenNames', displayName: 'Given Names'}, 
    { key: 'sex', displayName: 'Sex' },
    { key: 'result', displayName: 'Result' },
  ]

  constructor(
    private modalService: NgbModal,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private resultService: ResultService,
    private academicService: AcademicService,
    private classService: ClassService,
    private gradeService: GradingService,
    private getStudentFormBuilder: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>) {
        super(store);
  }

  ngOnInit(): void {
      this.breadCrumbItems = [{label: 'Results'},{ label: 'Register', active: true }];

      this.getStudentForm = this.getStudentFormBuilder.group({
        classId: [null, [Validators.required]],
        subjectId: [null, [Validators.required]],
        classSectionId: [null],
        examTypeId: [null, [Validators.required]],
      });

      this.getStudentForm.get('classId')?.valueChanges.subscribe(value => {
        if(value){
          this.getExamTypes(value);
        }
      });

      this.getSubjects();
      this.getActiveAcademicPeriod();
      this.getClasses();
      this.getGradingScale();
      this.getSections();
      this.getLookUps();
  }

  getStudents(){
     if(this.getStudentForm.valid){
      var classId = this.getStudentForm.get('classId')?.value;
      var classSectionId = this.getStudentForm.get('classSectionId')?.value;
      var academicYearId =  this.getStudentForm.get('academicYearId')?.value;
      this.toggleLoading();
      this.studentService.getStudentEnrollments(academicYearId, classId, classSectionId).pipe(finalize(() => this.toggleLoading())).subscribe({
          next: (response) => {
            this.studentEnrollments = response.data;
            if(this.studentEnrollments.length > 0){
            this.setStudentEnrollmentsToDisplay(this.studentEnrollments);
          }
        },
          error: (error) => {
            SimpleAlerts.showError(getErrorMessage(error));
          }
      });
    }else{
      SimpleAlerts.showWarning();
    }
  }

  getExamTypes(classId: any){
    this.classService.getClassExamTypes(classId).subscribe({
        next: (response) => {
          if(response.success)
            { 
              this.examTypes = response.data;
            }
        },
        error: () => {},
    });
  }

  setStudentEnrollmentsToDisplay(enrollments: StudentEnrollment[]): void {
    this.studentEnrollmentsToDisplay = enrollments.map((enrollment) => {
      return {
        id: enrollment.id,
        familyName: enrollment.student?.familyName || '#',
        givenNames: enrollment.student?.givenNames || '#',
        sex: enrollment.student?.sex || '#',
        admissionNumber: enrollment.student?.admissionNumber || '#',
        studentId: enrollment.student?.id || '#',
        result: 0
      };
    });
  }

  getSubjects(){
    this.teacherService.getMySubjects().subscribe({
        next: (response) => {
          if(response.success){ this.teacherSubjects = response.data;}
        },
        error: () => {},
      });
    }
  
  openModal(content: any){
    this.modalService.open(content, this.mdModalConfig);
  }

  resultEntered(event: any){}

  dismissModal() {
      this.modalService.dismissAll();
    }

 saveResults() {
    if (this.getStudentForm.invalid || this.studentEnrollmentsToDisplay.length === 0) {
        SimpleAlerts.showWarning();
        return;
    }

    const invalidResults = this.studentEnrollmentsToDisplay.some((student: any) => {
        return student.result < 0 || student.result > 20;
    });

    const payload = {
        examTypeId: this.getStudentForm.get('examTypeId')?.value, 
        academicPeriodId: this.academicPeriods[0]!.id!,
        subjectId: this.getStudentForm.get('subjectId')?.value,
        classId: this.getStudentForm.get('classId')?.value,
        classSectionId: this.getStudentForm.get('classSectionId')?.value,
        requestGradingScale: this.scale!.id!,
        studentResults: this.studentEnrollmentsToDisplay.map((student: any) => ({
            admissionNumber: student.admissionNumber,
            requestScore: student.result
        }))
    };

  this.toggleLoading();
  this.resultService.saveResults(payload)
      .pipe(finalize(() => this.toggleLoading()))
      .subscribe({
          next: (response) => {
              if (response.success) {
                  SimpleAlerts.showSuccess();
                  this.dismissModal();
                  this.resetForm();
              } else {
                  SimpleAlerts.showError(response.message);
              }
          },
          error: (error) => {
              SimpleAlerts.showError(getErrorMessage(error));
          }
      });
    }   

  resetForm(){
    
  }

  getGradingScale(){
    this.gradeService.getActiveGradingSystem().subscribe({
      next: (response) => {
        if(response.success){
          this.scale = response.data?.scale;
        }
      },
      error: () => {},
    });
  }

  getClasses(){
    this.teacherService.getMyClasses().subscribe({
        next: (response) => {
          if(response.success)
            { this.teacherClasses = response.data;}
        },
        error: () => {},
      });
  }

  getSections(){
    this.teacherService.getMyClassSections().subscribe({
        next: (response) => {
          if(response.success){ this.teacherSections = response.data;}
        },
        error: () => {},
    });
  }

  getActiveAcademicPeriod(){
    this.academicService.getActiveAcademicPeriods().subscribe({
      next: (response) => {
        if(response.success){
          this.academicPeriods = response.data;
        }
      },
      error: () => {},
    });
  }
}
