import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IpCameraService } from '../services/ip-camera.service';
import { IPCameraDTO } from 'shared-models/dtos/IPCameraDTO';

@Component({
  selector: 'app-ip-cameras',
  templateUrl: './ip-cameras.component.html',
  styleUrls: ['./ip-cameras.component.scss']
})
export class IPCamerasComponent implements OnInit {
  ipCameras: IPCameraDTO[] = [];

  constructor(private ipCameraService: IpCameraService, private router: Router) { }

  ngOnInit(): void {
    this.loadIPCameras();
  }

  loadIPCameras(): void {
    this.ipCameraService.getIPCameras().subscribe(ipCameras => {
      this.ipCameras = ipCameras;
    });
  }

  editIPCamera(ipCamera: IPCameraDTO): void {
    this.router.navigate(['/ip-cameras', ipCamera.id, 'edit']);
  }
}
