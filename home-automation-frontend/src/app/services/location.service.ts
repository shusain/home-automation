import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationDTO } from 'shared-models/dtos/LocationDTO'

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = `${environment.serverBaseUrl}/locations`;

  constructor(private http: HttpClient) {}

  getLocations(): Observable<LocationDTO[]> {
    return this.http.get<LocationDTO[]>(this.apiUrl);
  }

  getLocation(id: number): Observable<LocationDTO> {
    return this.http.get<LocationDTO>(`${this.apiUrl}/${id}`);
  }

  createLocation(location: LocationDTO): Observable<LocationDTO> {
    return this.http.post<LocationDTO>(this.apiUrl, location);
  }

  updateLocation(id: number, location: LocationDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, location);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
