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
import { ClassService } from '../core/services/api/class.service';


@NgModule({
  declarations: [
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    SlickCarouselModule,
    CountUpModule,
    NgSelectModule,
  ],
  providers: [
    FileService,
    SchoolService,
    AddressService,
    LookUpService,
    AdmissionNumberConfigurationService,
    ClassService
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports: [BreadcrumbsComponent]
})
export class SharedModule { }
