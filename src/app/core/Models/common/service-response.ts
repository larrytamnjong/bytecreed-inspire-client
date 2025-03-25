export class ServiceResponseBase {
    success!: boolean;
    code!: number;
    message?: string;
}

export class ServiceResponse<T> extends ServiceResponseBase {
    data?: T;
}

export class PaginatedServiceResponse<T> extends ServiceResponse<T> {
    totalRecords!: number;
    pageSize!: number;
    pageNumber!: number;
    totalPages!: number;
}