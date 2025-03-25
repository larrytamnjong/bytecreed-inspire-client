import { ServiceRequest } from "../../Models/common/service-request";

export class RequestHelper {
  public static createServiceRequest<T>(data: T): ServiceRequest<T> {
    return { data };
  }
}
