import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { Course } from 'src/app/core/Models/api/course';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CourseService } from 'src/app/core/services/api/course.service';
import { finalize } from 'rxjs';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  submitted: boolean = false;
  
    courses: Course[] | undefined | any = [];
    isCreateMode: boolean = true;
    courseForm!: UntypedFormGroup;
  
    get form() {return this.courseForm.controls;}
    
    headers: any = [{ key: 'name', displayName: 'Name' },]
  
  constructor( 
    protected override store: Store<{ data: RootReducerState }>, 
    private modalService: NgbModal, private courseFormBuilder: UntypedFormBuilder, 
    private courseService: CourseService) {
    super(store);
  }
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Configuration'},{ label: 'Course', active: true }];

    this.courseForm = this.courseFormBuilder.group({
      id: [null],
      name: [null,[Validators.required]],});

    this.getCourses();
  }

   addModal(content: any) {
      this.isCreateMode = true;
      this.submitted = false;
      this.modalService.open(content, this.mdModalConfig);
    }
  
    editModal(content: any, course: Course) {
        this.isCreateMode = false;
        this.submitted = false;
        this.courseForm.setValue(course);
        this.modalService.open(content, this.mdModalConfig);
      }
    
      getCourses() {
          this.toggleLoading();
          this.courseService.getCourses().pipe(finalize(() => this.toggleLoading())).subscribe({
              next: (response) => {
                this.courses = response.data;
              },
              error: (error) => {
                SimpleAlerts.showError(getErrorMessage(error));
              }
            });
        }
  
      onSubmit() {
        this.submitted = true;
        if (this.courseForm.invalid) {
          this.toggleLoading();
          return;
        }
        
        this.modalService.dismissAll();
    
        if(this.isCreateMode){
        this.toggleLoading();
          this.courseService.addCourse(this.courseForm.value).pipe(
            finalize(() => {this.toggleLoading(); this.reset();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getCourses();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
          });
        }else{
          SimpleAlerts.confirmDialog().then((result) => {
            if (result) {
              this.toggleLoading();
              this.courseService.updateCourse(this.courseForm.value).pipe(
                finalize(() => {this.toggleLoading(); this.reset();})).subscribe({
                next: (response) => {
                  if(response.success){
                    this.getCourses();
                    SimpleAlerts.showSuccess();
                  }
                },
                error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
              })
            }else{
              this.toggleLoading();
              return;
            }
          });
        }
      }

    deleteCourse(course: Course) {
        SimpleAlerts.confirmDeleteDialog().then((result) => {
          if (result) {
            this.toggleLoading();
            this.courseService.deleteCourse(course.id!).pipe(
              finalize(() => {this.toggleLoading();})).subscribe({
              next: (response) => {
                if(response.success){
                  this.getCourses();
                  SimpleAlerts.showSuccess();
                }
              },
              error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
            });
          }
        });
      }

    dismissModal() {
      this.modalService.dismissAll();
      this.reset();
    }
        
    reset() {
      this.submitted = false;
      this.isCreateMode = true;
      this.courseForm.reset();
    }
}
