import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent  implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false; 
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Analytics'},{ label: 'Analytic', active: true }];
  }
}
