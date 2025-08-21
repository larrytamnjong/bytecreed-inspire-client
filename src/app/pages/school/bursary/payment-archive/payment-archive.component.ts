import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-archive',
  templateUrl: './payment-archive.component.html',
  styleUrl: './payment-archive.component.scss'
})
export class PaymentArchiveComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false; 
  ngOnInit(): void {
  this.breadCrumbItems = [{label: 'Bursary'},{ label: 'Payment archive', active: true }];
  }
}
