import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagesResponse } from './models/ImagesResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapturedImagesService {

  private BASE_URL = `http://${environment.serverDomain}:3001`;  // Modify this if your server is running on a different address

  constructor(private http: HttpClient) { }

  getCapturedImages(): Observable<ImagesResponse> {
    return this.http.get(`${this.BASE_URL}/images`) as Observable<ImagesResponse>;
  }

  fetchImage(filename: string): string {
    return `${this.BASE_URL}/image/${filename}`;
  }
}
