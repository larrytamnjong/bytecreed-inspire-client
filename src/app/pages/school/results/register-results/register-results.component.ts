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
import { Key } from 'angular-feather/icons';

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
 studentEnrollmentsToDisplay: any = [];

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
      });

      this.getSubjects();
      this.getClasses();
      this.getSections();
      this.getLookUps();
  }

  getStudents(){
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
  
  importResults(){}

  resultEntered(event: any){}

  getClasses(){
    this.teacherService.getMyClasses().subscribe({
        next: (response) => {
          if(response.success){ this.teacherClasses = response.data;}
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
}
