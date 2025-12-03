import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ImagineService {
  private url = `${base_url}api/v1/img`;
  constructor(private http: HttpClient) {}

  uploadImages(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    return this.http.post<any>(`${this.url}/upload`, formData, {
      headers: new HttpHeaders(),
    });
  }

  getImageUrl(imageId: number): string {
    return `${this.url}/obtener/${imageId}`;
  }
}
