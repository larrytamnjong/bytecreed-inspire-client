import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './app-loading.component.html',
  styleUrl: './app-loading.component.scss'
})
export class AppLoadingComponent {
  @Input() loading: boolean = false;
}
