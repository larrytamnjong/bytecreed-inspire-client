import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LanguageService } from '../core/services/general/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// Component pages
import { LayoutComponent } from './layout.component';
import { VerticalComponent } from './vertical/vertical.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { HorizontalTopbarComponent } from './horizontal-topbar/horizontal-topbar.component';
import { TwoColumnComponent } from './two-column/two-column.component';
import { TwoColumnSidebarComponent } from './two-column-sidebar/two-column-sidebar.component';



@NgModule({
  declarations: [
    LayoutComponent,
    VerticalComponent,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    RightsidebarComponent,
    HorizontalComponent,
    HorizontalTopbarComponent,
    TwoColumnComponent,
    TwoColumnSidebarComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    TranslateModule,
    NgbCollapseModule,
    FormsModule, ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [LanguageService]
})
export class LayoutsModule { }
