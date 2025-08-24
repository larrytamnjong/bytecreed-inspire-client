import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fee-reports',
  templateUrl: './fee-reports.component.html',
  styleUrl: './fee-reports.component.scss'
})
export class FeeReportsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false; 
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, {label: "Financial"}, { label: 'Fees', active: true }];
  }
}