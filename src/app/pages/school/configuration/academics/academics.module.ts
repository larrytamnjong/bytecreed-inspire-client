import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
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
import { SharedModule } from '../../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AcademicsRoutingModule } from './academics-routing.module';
import { AcademicTermsComponent } from './academic-terms/academic-terms.component';
import { AcademicPeriodsComponent } from './academic-periods/academic-periods.component';
import { AcademicYearsComponent } from './academic-years/academic-years.component';
import { RolloverComponent } from './rollover/rollover.component';


@NgModule({
  declarations: [
  AcademicTermsComponent,
  AcademicPeriodsComponent,
  AcademicYearsComponent,
  RolloverComponent
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
    AcademicsRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgSelectModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AcademicsModule { }
