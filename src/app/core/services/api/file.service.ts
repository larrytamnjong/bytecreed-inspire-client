import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { File } from "../../Models/api/file";

@Injectable({ providedIn: 'root'})
export class FileService {
  private readonly file_controller: string = "v1/files";

  constructor(private apiService: ApiHttpService) {}
  
  getFile(fileId: string): Observable<ServiceResponse<File>> {
    return this.apiService.get(`${this.file_controller}/${fileId}/file`);
  } 

  updateFile(file: any, fileId: string): Observable<ServiceResponse<File>> {
    const formData = new FormData();
    formData.append("data", file);
    return this.apiService.put(`${this.file_controller}/${fileId}/file`, formData);
  }

  addFile(file: any): Observable<ServiceResponse<File>> {
    const formData = new FormData();
    formData.append("data", file);
    return this.apiService.post(`${this.file_controller}/file`, formData);
  }
}