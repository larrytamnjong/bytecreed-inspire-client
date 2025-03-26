import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.scss'
})
export class InstitutionComponent {
  breadCrumbItems!: Array<{}>;

  loading = false;
  submitted = false;
  institutionForm!: UntypedFormGroup;
  searchTerm: any;
  searchResults: any;
  institutionList: any;
  institutionListCopy: any;

  constructor(private modalService: NgbModal, public service: PaginationService,private formBuilder: UntypedFormBuilder,){}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'General' },
      { label: 'Institution', active: true }
    ];

    this.institutionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.institutionListCopy = [];
    this.institutionList = cloneDeep([]);
    this.institutionListCopy = this.service.changePage(this.institutionList)
  }

  get form() {return this.institutionForm.controls;}

  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  onSort(column: any) {
    this.institutionListCopy = this.service.onSort(column, this.institutionListCopy)
  }

  saveInstitution(){
   this.submitted = true;
   if (this.institutionForm.invalid) {
     return;
   }
  }
  changePage() {
    this.institutionListCopy = this.service.changePage(this.institutionList)
  }

  closeCreateInstitutionModal() {
    this.modalService.dismissAll();
  }
  performSearch(): void {
    this.searchResults = this.institutionList.filter((item: any) => {
      return (
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.institutionListCopy = this.service.changePage(this.searchResults)
  }
}
