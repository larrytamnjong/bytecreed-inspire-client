import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { StudentService } from 'src/app/core/services/api/student.service';
import { finalize } from 'rxjs/operators';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';

@Component({
  selector: 'app-cash-desk',
  templateUrl: './cash-desk.component.html',
  styleUrl: './cash-desk.component.scss'
})
export class CashDeskComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  activeTab: number = 1; 

  amountInProgress: string = '';   
  enteredAmount: number = 0;  
  currencySymbol: string = 'XAF';

  studentEnrollmentsToDisplay: any[] = [];
  studentEnrollments: any = [];
 
  constructor(
    private studentService: StudentService,
    protected override store: Store<{ data: RootReducerState }>, ) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Bursary'},{ label: 'Cash Desk', active: true }];
    this.getStudentEnrollments();
  }

  getStudentEnrollments(){
    this.toggleLoading();
    this.studentService.getStudentEnrollments(null, null, null, null).pipe(finalize(() => this.toggleLoading())).subscribe({
        next: (response) => {
          this.studentEnrollments = response.data;
          this.studentEnrollmentsToDisplay = this.setStudentEnrollmentsToDisplay(this.studentEnrollments);
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
   }
  
  setQuantity(value: string) {
   if (this.amountInProgress.length < 12) { 
    this.amountInProgress += value;
    this.updateEnteredAmount(this.amountInProgress);
   }
  }

  updateEnteredAmount(value: string) {
  this.enteredAmount = Number(value) || 0;
}

  reduceQuantity() {
    this.amountInProgress = this.amountInProgress.slice(0, -1);
    this.updateEnteredAmount(this.amountInProgress);
  }

  clearQuantity() {
    this.amountInProgress = '';
    this.enteredAmount = 0;
  }

  pay() {
    console.log('Paying amount: ', this.enteredAmount);
  }
}