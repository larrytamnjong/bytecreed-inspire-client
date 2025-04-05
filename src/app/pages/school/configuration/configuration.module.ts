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
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SchoolComponent } from './school/school.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdmissionComponent } from './admission/admission.component';
import { SectionsComponent } from './sections/sections.component';
import { ExamTypesComponent } from './exam-types/exam-types.component';
import { AcademicsModule } from './academics/academics.module';
import { GradingModule } from './grading/grading.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClassesComponent } from './classes/classes.component';

@NgModule({
  declarations: [
    SchoolComponent,
    AdmissionComponent,
    SectionsComponent,
    ExamTypesComponent,
    ClassesComponent
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
    ConfigurationRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgSelectModule,
    AcademicsModule,
    GradingModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationModule { }
