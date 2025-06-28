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

  addTeacherForm!: UntypedFormGroup;
  removeTeacherForm!: UntypedFormGroup;
  get fAddTeachersForm() { return this.addTeacherForm.controls; }

   headers: any = [
    { key: 'familyName', displayName: 'Family Name' },
    { key: 'givenNames', displayName: 'Given Names'}
  ];

  constructor(
    private modalService: NgbModal,
    private personnelService: PersonnelService,
    private teacherService: TeacherService,
    private addTeacherFormBuilder: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>) {
      super(store);
    }

    ngOnInit(): void {
      this.breadCrumbItems = [{label: 'Personnel'},{ label: 'Teachers', active: true }];

      this.addTeacherForm = this.addTeacherFormBuilder.group({
          ids: [null, [Validators.required]],
      });
      this.getLookUps();
      this.getEmployees();
      this.getTeachers();
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
                this.dismissModal();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
    }

  addModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, {...this.mdModalConfig, backdrop: 'static'});
  }

  editModal(content: any, teacher: any) {
    this.submitted = false;
    this.modalService.open(content, {...this.mdModalConfig, backdrop: 'static'});
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
  }

  getEmployees() {
      this.toggleLoading();
      this.personnelService.getEmployees().pipe(
        finalize(() => {this.loading = false;})).subscribe({
        next: (response) => {
          if(response.success){ this.employees = response.data;}
        },
        error: () => {},
      });
    }

  getTeachers() {
      this.toggleLoading();
      this.teacherService.getTeachers().pipe(
        finalize(() => {this.loading = false;})).subscribe({
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
          return {
            id: teacher.id,
            familyName: teacher.personnel?.familyName || '#',
            givenNames: teacher.personnel?.givenNames || '#',
          };
        });
      }

  dismissModal() {
      this.modalService.dismissAll();
      this.resetForm();
    }
}
