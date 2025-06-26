import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { File } from "../../Models/api/file";

@Injectable({ providedIn: 'root'})
export class FileService {
  private readonly FILE_CONTROLLER: string = "v1/files";

  constructor(private apiService: ApiHttpService) {}
  
  getFile(fileId: string): Observable<ServiceResponse<File>> {
    return this.apiService.get(`${this.FILE_CONTROLLER}/${fileId}/file`);
  } 

  updateFile(file: any, fileId: string): Observable<ServiceResponse<File>> {
    const formData = new FormData();
    formData.append("data", file);
    return this.apiService.put(`${this.FILE_CONTROLLER}/${fileId}/file`, formData);
  }

  addFile(file: any): Observable<ServiceResponse<File>> {
    const formData = new FormData();
    formData.append("data", file);
    return this.apiService.post(`${this.FILE_CONTROLLER}/file`, formData);
  }
}