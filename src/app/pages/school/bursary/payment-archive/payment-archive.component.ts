import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { StudentService } from 'src/app/core/services/api/student.service';
import { FeesService } from 'src/app/core/services/api/fees.service';

@Component({
  selector: 'app-payment-archive',
  templateUrl: './payment-archive.component.html',
  styleUrl: './payment-archive.component.scss'
})
export class PaymentArchiveComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  reloadTable: number = 0;
    headers: any = [
    { key: 'transactionAmount', displayName: 'Amount' },
    { key: 'internalTransactionReference', displayName: 'Internal Ref' }, 
    { key: 'externalTransactionReference', displayName: 'External Ref' }, 
    { key: 'paymentDate', displayName: 'Payment Date' },
    { key: 'Description', displayName: 'Description' },
    { key: 'status', displayName: 'Status' }
  ]

 constructor(
    private studentService: StudentService,
    private feeService: FeesService,
    protected override store: Store<{ data: RootReducerState }>, ) {
    super(store);
  }
  ngOnInit(): void {
  this.breadCrumbItems = [{label: 'Bursary'},{ label: 'Payment archive', active: true }];

  this.getLookUps();
  }

  onSelectedRowsChange(event: any){
  }

    toggleReloadTable(){
    this.reloadTable++;
  }
}
