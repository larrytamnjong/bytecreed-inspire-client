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
import { ParentsComponent } from './parents/parents.component';
import { AttendanceModule } from './attendance/attendance.module';
import { ExamComponent } from './exam/exam.component';
import { LibraryComponent } from './library/library.component';
import { InventoryComponent } from './inventory/inventory.component';
import { BoardingComponent } from './boarding/boarding.component';
import { TransportationComponent } from './transportation/transportation.component';
import { FinanceModule } from './finance/finance.module';
import { UsersModule } from './users/users.module';
import { BursaryModule } from './bursary/bursary.module';
import { FilesComponent } from './files/files.component';
import { AccountModule } from 'src/app/account/account.module';

@NgModule({
  declarations: [
    AnalyticsComponent,
    ParentsComponent,
    ExamComponent,
    LibraryComponent,
    InventoryComponent,
    BoardingComponent,
    TransportationComponent,
    FilesComponent
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
    NgbAccordionModule,
    AttendanceModule,
    FinanceModule,
    UsersModule,
    BursaryModule,
    AccountModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolModule { }
