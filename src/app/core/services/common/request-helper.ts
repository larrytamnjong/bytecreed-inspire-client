export class ServiceRequest<T> {
  data!: T;
}

export class RequestHelper {
  public static createServiceRequest<T>(data: T): ServiceRequest<T> {
    return { data };
  }
}
