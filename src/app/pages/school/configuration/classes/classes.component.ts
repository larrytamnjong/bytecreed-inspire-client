import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { ClassService } from 'src/app/core/services/api/class.service';
import { Class } from 'src/app/core/Models/api/class';
import { LookUpView } from 'src/app/core/Models/common/look-up-view';
import { LookUpData } from 'src/app/core/Models/common/look-up-data';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { getLookUpsAction } from 'src/app/store/common/look-up/look-up.action';
import { selectLookUpsView } from 'src/app/store/common/look-up/look-up.selector';
import { LookUpTableEnum } from 'src/app/core/enums/look-up-table';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false;
  lookUps?: LookUpView;
  activeAndInactiveStatus: LookUpData[] = [];

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

  constructor(
    private modalService: NgbModal,
    private classService: ClassService,
    private classFormBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>
  ) {}

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

  loadData(){
    this.getLookUps();
    this.getClasses();
  }

  toggleLoading() {
    this.loading = !this.loading;
  }
  getLookUps() {
    this.store.dispatch(getLookUpsAction());
    this.store.select(selectLookUpsView).subscribe((lookUps) => {
      if(lookUps){
       this.lookUps = lookUps;
       this.activeAndInactiveStatus = this.lookUps?.lookUpData?.filter((item: LookUpData) => item.tableCode === LookUpTableEnum.ActiveAndInactiveStatus) || [];
      }
    });
  }

  getStatusLabel(status: boolean): string {
    const statusCode = status ? 1 : 0;
    const statusItem = this.activeAndInactiveStatus.find(item => item.dataCode === statusCode);
    return statusItem?.text ?? '';
  }

}
