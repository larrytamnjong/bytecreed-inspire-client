import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/core/Models/api/school';
import { Address } from 'src/app/core/Models/common/address';
import { Country } from 'src/app/core/Models/common/country';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { LookUpService } from 'src/app/core/services/common/look-up.service';
import { SchoolService } from 'src/app/core/services/api/school.service';
import { FileService } from 'src/app/core/services/api/file.service';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { File } from 'src/app/core/Models/api/file';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrl: './school.component.scss'
})
export class SchoolComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false;
  schoolForm!: UntypedFormGroup;
  addressForm!: UntypedFormGroup;
  countries: Country[] = [];
  logoFile: File | undefined = undefined;
  logoFileId: null | undefined = null;
  submitted = false;

  get fSchool() {return this.schoolForm.controls;}
  get fAddress() {return this.addressForm.controls;}

  constructor(
    private addressFormBuilder: UntypedFormBuilder, 
    private schoolFormBuilder: UntypedFormBuilder,
    private lookUpService: LookUpService,
    private schoolService: SchoolService,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
     this.breadCrumbItems = [
      { label: 'Configuration' },
      { label: 'School', active: true }
    ];
  
    this.getCountries();
    this.getSchool();

    this.schoolForm = this.schoolFormBuilder.group({
      name: ['', [Validators.required]],
      phone: ['',[Validators.required]],
      email: [''],
      logoFileId: [null],
      addressId: [null]
    });

    this.addressForm = this.addressFormBuilder.group({
      countryId: [null],
      addressLine1: [''],
      addressLine2: [''],
      postalCode: ['']
    });

    this.schoolForm.get('logoFileId')?.valueChanges.subscribe(value => {this.logoFileId = value;});
  }

  onSubmit() {
    this.submitted = true;
    if (this.schoolForm.invalid || this.addressForm.invalid) {
      return;
  }
  this.toggleLoading();
  this.schoolService.updateCurrentSchool({school: this.schoolForm.value, address: this.addressForm.value }).pipe(
    finalize(() => this.toggleLoading())).subscribe({
    next: (response) => {
      if(!response.success) {SimpleAlerts.showError(response.message);}
      if (response.data?.school) {
        this.setSchoolValues(response.data.school);
        SimpleAlerts.showSuccess();
      }
      if (response.data?.address) { 
        this.setAddressValues(response.data.address);
      }
    },
    error: (error) => {
      SimpleAlerts.showError(getErrorMessage(error));
    }
  });
}

onLogoFileChange(event: any): void {
  const file = event.target.files[0];
  if (!file || this.schoolForm.invalid || this.addressForm.invalid ) {
    return;
  }

   if(this.logoFileId){
    this.toggleLoading();
     this.fileService.updateFile(file, this.logoFileId).pipe(
      finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if (response.success) {
          this.logoFile = response.data;
          this.logoFile = response.data;
          this.schoolForm.patchValue({ logoFileId: response.data?.id });
          this.onSubmit();
        }
      },
      error: (error) => {SimpleAlerts.showError(getErrorMessage(error));}
    });
   }else{
    this.toggleLoading();
    this.fileService.addFile(file).pipe(
      finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if (response.success) {
          this.logoFile = response.data;
          this.schoolForm.patchValue({ logoFileId: response.data?.id });
          this.onSubmit();
        }
      },
      error: (error) => {SimpleAlerts.showError(getErrorMessage(error));}
    });
   }
}

getLogoFile() {
  if (this.schoolForm.get('logoFileId')?.value) {
    this.fileService.getFile(this.schoolForm.get('logoFileId')?.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.logoFile = response.data;
        }
      },
      error: (error) => {}
    });
  }
}

getImageSrc(): string {
  if (this.logoFile?.data && this.logoFile?.mimeType) {
    return `data:${this.logoFile.mimeType};base64,${this.logoFile.data}`;
  }
  return 'assets/images/upload.jpg';
}

setSchoolValues(school: School) {
  this.schoolForm.setValue({
    name: school.name,
    phone: school.phone,
    email: school.email,
    logoFileId: school.logoFileId,
    addressId: school.addressId
  });
}

setAddressValues(address: Address) {
  this.addressForm.setValue({
    countryId: address.countryId,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
    postalCode: address.postalCode
  });
}

  getCountries() {
  this.lookUpService.getAll().subscribe({
    next: (response) => {
      this.countries = response.countries;
    },
    error: (error) => {}
  });
}

getSchool() {
  this.toggleLoading();
  this.schoolService.getCurrentSchool().pipe(finalize(() => this.toggleLoading())).subscribe({
   next: (response) => {
     if(response.data?.school){
      this.setSchoolValues(response.data.school);
      this.getLogoFile();
    }
    if(response.data?.address){
      this.setAddressValues(response.data.address);
    }
   },
   error: (error) => {SimpleAlerts.showError(getErrorMessage(error));this.toggleLoading();}
  });
}

toggleLoading() {this.loading = !this.loading;}

}
