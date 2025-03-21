import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})

/**
 * Page500 Component
 */
export class UnAuthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.documentElement.setAttribute('data-sidebar-size', 'lg');
  }

}
