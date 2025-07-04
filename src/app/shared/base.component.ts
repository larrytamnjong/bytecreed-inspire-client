
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { LookUpView } from 'src/app/core/Models/common/look-up-view';
import { LookUpData } from 'src/app/core/Models/common/look-up-data';
import { getLookUpsAction } from 'src/app/store/common/look-up/look-up.action';
import { selectLookUpsView } from 'src/app/store/common/look-up/look-up.selector';
import { LookUpTableEnum } from 'src/app/core/enums/look-up-table';
import { Country } from 'src/app/core/Models/common/country';
import { generatePDF } from '../core/helpers/pdf-utility';
import { formatDateToLocalISOString } from 'src/app/core/helpers/date-utility';

export class BaseComponent  {
  loading: boolean = false;
  lookUps?: LookUpView;
  activeAndInactiveStatus: LookUpData[] = [];
  yesOrNoResponse: LookUpData[] = [];
  sexOptions: LookUpData[] = [];
  studentStatus: LookUpData[] = [];
  countries: Country[] = [];

  mdModalConfig = { size: 'md', centered: true };
  lgModalConfig = { size: 'lg', centered: true };
  xlModalConfig = { size: 'xl', centered: true };
  
  constructor(protected store: Store<{ data: RootReducerState }>) {}

  getLookUps() {
    this.store.dispatch(getLookUpsAction());
    this.store.select(selectLookUpsView).subscribe((lookUps) => {
      if(lookUps){
        this.lookUps = lookUps;
        this.activeAndInactiveStatus = this.lookUps?.lookUpData?.filter((item: LookUpData) => item.tableCode === LookUpTableEnum.ActiveAndInactiveStatus) || [];
        this.yesOrNoResponse = this.lookUps?.lookUpData?.filter((item: LookUpData) => item.tableCode === LookUpTableEnum.YesOrNoResponse) || [];
        this.countries = this.lookUps?.countries || [];
        this.sexOptions = this.lookUps?.lookUpData?.filter((item: LookUpData) => item.tableCode === LookUpTableEnum.Sex) || [];
        this.studentStatus = this.lookUps?.lookUpData?.filter((item: LookUpData) => item.tableCode === LookUpTableEnum.StudentStatus) || [];
      }
    });
  }

  public stopAllLoading(){
    this.loading = false;
  }

  public toggleLoading() {
    this.loading = !this.loading;
  }

  public getActiveOrInactiveLabel(status: boolean | null): string {
    const statusCode = status ? 1 : 0;
    const statusItem = this.activeAndInactiveStatus.find(item => item.dataCode === statusCode);
    return statusItem?.text ?? '#';
  }

  public getYesOrNoLabel(value: boolean): string {
    const response = value ? 1 : 0;
    const responseItem = this.yesOrNoResponse.find(item => item.dataCode === response);
    return responseItem?.text ?? '#';
  }

  public getSexLabel(sex: number): string {
    const statusItem = this.sexOptions.find(item => item.dataCode === sex);
    return statusItem?.text ?? '#';
  }

  public getStudentStatusLabel(status: number): string { 
    const statusItem = this.studentStatus.find(item => item.dataCode === status);
    return statusItem?.text ?? '#';
  }

  public async generatePDF(html: string, fileName: string) {
    await generatePDF(html, fileName);
  }

  public formatDateToLocalISOString(date: Date): string {
     return formatDateToLocalISOString(date);
  }

  public parseToNumber(value : any){
    return Number(value);
  }

}