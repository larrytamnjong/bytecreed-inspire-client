import { Component, OnInit } from '@angular/core';
import { act } from '@ngrx/effects';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.component.html',
  styleUrl: './boarding.component.scss'
})
export class BoardingComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false; 
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Boarding', active: true}];
  }
}
