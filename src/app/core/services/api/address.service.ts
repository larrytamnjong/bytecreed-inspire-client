import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { Address } from "../../Models/common/address";
import { RequestHelper } from "../common/service-request-helper";
import { ServiceResponse } from "../../Models/common/service-response";


@Injectable({ providedIn: 'root'})
export class AddressService {

    private readonly address_controller: string = "v1/addresses";
  constructor(private apiService: ApiHttpService) {}

  getAddress(addressId: string): Observable<ServiceResponse<Address>> {
    return this.apiService.get(`${this.address_controller}/${addressId}/address`);
  }

  updateAddresses(addresses: Address[]): Observable<ServiceResponse<Address[]>> {
    return this.apiService.put(`${this.address_controller}`, RequestHelper.createServiceRequest(addresses));
  }

  addAddresses(addresses: Address[]): Observable<ServiceResponse<Address[]>> {
    return this.apiService.post(`${this.address_controller}`, RequestHelper.createServiceRequest(addresses));
  }

}