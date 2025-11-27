import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagineService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  uploadImages(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    return this.http.post<any>(`${this.baseUrl}/api/v1/img/upload`, formData, {
      headers: new HttpHeaders(),
    });
  }
}
//gola