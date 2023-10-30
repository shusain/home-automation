import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceDTO } from 'shared-models/dtos/DeviceDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = `${environment.serverBaseUrl}/devices`;

  constructor(private http: HttpClient) {}

  getDevices(): Observable<DeviceDTO[]> {
    return this.http.get<DeviceDTO[]>(this.apiUrl);
  }

  getDevice(deviceId: number): Observable<DeviceDTO> {
    return this.http.get<DeviceDTO>(`${this.apiUrl}/${deviceId}`);
  }

  addDevice(locationId: number, deviceName: string): Observable<DeviceDTO> {
    const device = { locationId, name: deviceName };
    return this.http.post<DeviceDTO>(this.apiUrl, device);
  }

  updateDevice(device: DeviceDTO): Observable<DeviceDTO> {
    return this.http.put<DeviceDTO>(`${this.apiUrl}/${device.id}`, device);
  }

  deleteDevice(deviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${deviceId}`);
  }
}
