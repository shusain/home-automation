import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapturedImagesService {

  private BASE_URL = 'http://localhost:3001';  // Modify this if your server is running on a different address

  constructor(private http: HttpClient) { }

  getCapturedImages(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/images`);
  }

  fetchImage(filename: string): string {
    return `${this.BASE_URL}/image/${filename}`;
  }
}
