import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { Address } from "../../Models/common/address";
import { RequestHelper } from "../common/service-request-helper";
import { ServiceResponse } from "../../Models/common/service-response";


@Injectable({ providedIn: 'root'})
export class AddressService {

    private readonly ADDRESS_CONTROLLER: string = "v1/addresses";
  constructor(private apiService: ApiHttpService) {}

  getAddress(addressId: string): Observable<ServiceResponse<Address>> {
    return this.apiService.get(`${this.ADDRESS_CONTROLLER}/${addressId}/address`);
  }

  updateAddresses(addresses: Address[]): Observable<ServiceResponse<Address[]>> {
    return this.apiService.put(`${this.ADDRESS_CONTROLLER}`, RequestHelper.createServiceRequest(addresses));
  }

  addAddresses(addresses: Address[]): Observable<ServiceResponse<Address[]>> {
    return this.apiService.post(`${this.ADDRESS_CONTROLLER}`, RequestHelper.createServiceRequest(addresses));
  }

}