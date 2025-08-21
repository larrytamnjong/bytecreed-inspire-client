import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrl: './chart-of-accounts.component.scss'
})
export class ChartOfAccountsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false; 
  ngOnInit(): void {
  this.breadCrumbItems = [{label: 'Accounting'},{ label: 'Chart of Accounts', active: true }];
  }
}