import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootReducerState } from '../store';
@Component({
  selector: 'app-auth-layout',
  template: `<router-outlet></router-outlet>`
})
export class AuthLayoutComponent implements OnInit {
    layoutType!: string;
     constructor(private store: Store<RootReducerState>) { }
    ngOnInit(): void {
     this.store.select('layout').subscribe((data) => {
      this.layoutType = data.LAYOUT;
      document.documentElement.setAttribute('data-layout', data.LAYOUT);
      document.documentElement.setAttribute('data-theme', data.LAYOUT_THEME);
    })
  }
}