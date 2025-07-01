import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from 'src/app/core/services/api/teacher.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

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

 getStudentForm!: UntypedFormGroup;

 get fGetStudentForm() { return this.getStudentForm.controls; }

  constructor(
    private modalService: NgbModal,
    private teacherService: TeacherService,
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
  }

  getStudents(){
  }

}
