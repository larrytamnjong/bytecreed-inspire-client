import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/core/Models/api/school';
import { Address } from 'src/app/core/Models/common/address';
import { Country } from 'src/app/core/Models/common/country';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { AddressService } from 'src/app/core/services/api/address.api';
import { LookUpService } from 'src/app/core/services/common/look-up.service';
import { SchoolService } from 'src/app/core/services/api/school.api';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrl: './school.component.scss'
})
export class SchoolComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  schoolForm!: UntypedFormGroup;
  addressForm!: UntypedFormGroup;

  school: School = new School();
  address: Address = new Address();
  countries: Country[] = [];
  selectedCountryId: string | null = null;
  submitted = false;

  get fSchool() {return this.schoolForm.controls;}
  get fAddress() {return this.addressForm.controls;}

  constructor(
    private addressFormBuilder: UntypedFormBuilder, 
    private schoolFormBuilder: UntypedFormBuilder,
    private addressService: AddressService,
    private lookUpService: LookUpService,
    private schoolService: SchoolService
  ) { }

  ngOnInit(): void {

     this.breadCrumbItems = [
      { label: 'Configuration' },
      { label: 'School', active: true }
    ];
  
    this.getCountries();

    this.schoolForm = this.schoolFormBuilder.group({
      name: ['', [Validators.required]],
      phone: ['',[Validators.required]],
      email: [''],
      logoFileId: [''],
      addressId: ['']
    });

    this.addressForm = this.addressFormBuilder.group({
      countryId: [null],
      addressLine1: [''],
      addressLine2: [''],
      postalCode: ['']
    });

    this.addressForm.get('countryId')?.valueChanges.subscribe(value => {
      this.selectedCountryId = value;
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.schoolForm.invalid || this.addressForm.invalid) {
      return;
  }
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
  this.lookUpService.getAll().subscribe(response => {
    this.countries = response.countries;
  });
}

}
