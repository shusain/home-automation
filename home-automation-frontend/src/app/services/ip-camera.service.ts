import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPCameraDTO } from 'shared-models/dtos/IPCameraDTO';

@Injectable({
  providedIn: 'root',
})
export class IpCameraService {
  private readonly API_URL = 'http://localhost:3000/ipcameras';

  constructor(private httpClient: HttpClient) {}

  getIPCameras(): Observable<IPCameraDTO[]> {
    return this.httpClient.get<IPCameraDTO[]>(this.API_URL);
  }

  getIPCamera(id: number): Observable<IPCameraDTO> {
    return this.httpClient.get<IPCameraDTO>(`${this.API_URL}/${id}`);
  }

  createIPCamera(ipCamera: IPCameraDTO): Observable<IPCameraDTO> {
    return this.httpClient.post<IPCameraDTO>(this.API_URL, ipCamera);
  }

  updateIPCamera(ipCamera: IPCameraDTO): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/${ipCamera.id}`, ipCamera);
  }

  deleteIPCamera(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`);
  }

  startStream(id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/${id}/start-stream`, {});
  }

  stopStream(id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/${id}/stop-stream`, {});
  }
}
