import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-desk',
  templateUrl: './cash-desk.component.html',
  styleUrl: './cash-desk.component.scss'
})
export class CashDeskComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false; 
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Bursary'},{ label: 'Cash Desk', active: true }];
  }
}