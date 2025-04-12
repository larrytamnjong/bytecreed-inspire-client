import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import { finalize } from 'rxjs';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { AdmissionNumberConfigurationService } from 'src/app/core/services/api/admission-number-configuration.service';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.scss'
})
export class AdmissionComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  submittedAdmissionNumberConfigurationForm: boolean = false;
  loading: boolean = false; 

  admissionNumberConfigurationForm!: UntypedFormGroup;
  get fAdmissionNumberConfiguration() {return this.admissionNumberConfigurationForm.controls;}

  constructor(private admissionNumberConfigurationFormBuilder: UntypedFormBuilder, private admissionNumberConfigurationService: AdmissionNumberConfigurationService) { }
  ngOnInit(): void {
    this.toggleLoading();
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Admission', active: true }];

    this.getAdmissionNumberConfiguration();

    this.admissionNumberConfigurationForm = this.admissionNumberConfigurationFormBuilder.group({
      leading: [null],
      startFromNumber: [1,[Validators.required]],
      trailing: [null],
    });
    this.toggleLoading();
  }

  onSaveAdmissionForm() {
    this.submittedAdmissionNumberConfigurationForm = true;
    if(this.admissionNumberConfigurationForm.invalid) {
      return;
    }
   
    SimpleAlerts.confirmDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        this.admissionNumberConfigurationService.addOrUpdateAdmissionNumberConfiguration(this.admissionNumberConfigurationForm.value).pipe(
          finalize(() => this.toggleLoading())).subscribe({
          next: (response) => {
            if(response.success){
              SimpleAlerts.showSuccess();
              this.getAdmissionNumberConfiguration();
            }else{SimpleAlerts.showError(response.message);}
          },
          error: (error) => {SimpleAlerts.showError(getErrorMessage(error));}
        });
      }else{
        return;
      }
    });
  }

  getAdmissionNumberConfiguration() {
    this.admissionNumberConfigurationService.getAdmissionNumberConfiguration().subscribe({
      next: (response) => {
        if(response.success){
        this.admissionNumberConfigurationForm.setValue({...response.data!});
        }
      },
      error: (error) => {}
    });
  }
 
  resetAdmissionForm() {
    this.admissionNumberConfigurationForm.reset();
    this.admissionNumberConfigurationForm.patchValue({startFromNumber: 1});
    this.submittedAdmissionNumberConfigurationForm = false;
  }

  toggleLoading() {
    this.loading = !this.loading;
  }
}
