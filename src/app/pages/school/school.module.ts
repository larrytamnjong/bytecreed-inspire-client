import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbAccordionModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { CountUpModule } from 'ngx-countup';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SchoolRoutingModule } from './school-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AnalyticsComponent } from './analytics/analytics.component';
import { StudentsModule } from './students/students.module';
import { PersonnelModule } from './personnel/personnel.module';
import { ResultsModule } from './results/results.module';
import { ReportingModule } from './reporting/reporting.module';

@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    FeatherModule.pick(allIcons),
    CountUpModule,
    LeafletModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    SlickCarouselModule,
    FlatpickrModule.forRoot(),
    SchoolRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    ConfigurationModule,
    StudentsModule,
    PersonnelModule,
    ResultsModule,
    ReportingModule,
    NgSelectModule,
    NgbAccordionModule
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolModule { }
