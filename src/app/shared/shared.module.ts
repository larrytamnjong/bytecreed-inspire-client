import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CountUpModule } from 'ngx-countup';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FileService } from '../core/services/api/file.service';
import { SchoolService } from '../core/services/api/school.service';
import { AddressService } from '../core/services/api/address.service';
import { LookUpService } from '../core/services/common/look-up.service';
import { AdmissionNumberConfigurationService } from '../core/services/api/admission-number-configuration.service';
import { ClassSectionService } from '../core/services/api/class-section.service';
import { FormsModule } from '@angular/forms';
import { GenericAppTableComponent } from './generic-app-table/generic-app-table.component';
import { AcademicService } from '../core/services/api/academics.service';
import { ClassService } from '../core/services/api/class.service';
import { SubjectService } from '../core/services/api/subject.service';
import { AppLoadingComponent } from './app-loading/app-loading.component';
import { CourseService } from '../core/services/api/course.service';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    GenericAppTableComponent,
    AppLoadingComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    SlickCarouselModule,
    CountUpModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [
    FileService,
    SchoolService,
    AddressService,
    LookUpService,
    AdmissionNumberConfigurationService,
    ClassSectionService,
    AcademicService,
    ClassService,
    SubjectService,
    CourseService
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports: [GenericAppTableComponent, AppLoadingComponent, BreadcrumbsComponent]
})
export class SharedModule { }
