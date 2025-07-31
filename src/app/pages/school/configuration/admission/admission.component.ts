import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import { finalize } from 'rxjs';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { SettingsService } from 'src/app/core/services/api/settings.service';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.scss'
})
export class AdmissionComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  submitted: boolean = false;

  admissionNumberSettingsForm!: UntypedFormGroup;
  get fAdmissionNumberSettings() {return this.admissionNumberSettingsForm.controls;}

  constructor(
    private admissionNumberSettingsFormBuilder: UntypedFormBuilder, 
    private settingsService: SettingsService,
    protected override store: Store<{ data: RootReducerState }>) 
    { 
      super(store);
    }
  ngOnInit(): void {
    this.toggleLoading();
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Admission', active: true }];

    this.getAdmissionNumberSettings();

    this.admissionNumberSettingsForm = this.admissionNumberSettingsFormBuilder.group({
      prefix: [null],
      startingNumber: [1,[Validators.required]],
      suffix: [null],
    });
    this.toggleLoading();
  }

  onSaveAdmissionForm() {
    this.submitted = true;
    if(this.admissionNumberSettingsForm.invalid) {
      return;
    }
   
    SimpleAlerts.confirmDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        this.settingsService.addOrUpdateAdmissionNumberSettings(this.admissionNumberSettingsForm.value).pipe(
          finalize(() => this.toggleLoading())).subscribe({
          next: (response) => {
            if(response.success){
              SimpleAlerts.showSuccess();
              this.getAdmissionNumberSettings();
            }else{SimpleAlerts.showError(response.message);}
          },
          error: (error) => {SimpleAlerts.showError(getErrorMessage(error));}
        });
      }else{
        return;
      }
    });
  }

  getAdmissionNumberSettings() {
    this.settingsService.getAdmissionNumberSettings().subscribe({
      next: (response) => {
        if(response.success){
        this.admissionNumberSettingsForm.setValue({...response.data!});
        }
      },
      error: (error) => {}
    });
  }

 }
