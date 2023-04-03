import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../services/device.service';
import { IpCameraService } from '../services/ip-camera.service';
import { DeviceDTO } from 'shared-models/dtos/DeviceDTO';
import { IPCameraDTO } from 'shared-models/dtos/IPCameraDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  deviceId!: number;
  device?: DeviceDTO;
  ipCameraForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private ipCameraService: IpCameraService
  ) {
    
    this.ipCameraForm = new FormGroup({
      name: new FormControl('', Validators.required),
      rtspUrl: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.deviceId = Number(params['id']);
      this.loadDevice();
    });
  }

  loadDevice(): void {
    this.deviceService.getDevice(this.deviceId).subscribe(device => {
      this.device = device;
    });
  }

  addIPCamera(ipCamera: IPCameraDTO): void {
    if(this.device)
      ipCamera.deviceId = this.device.id;
    this.ipCameraService.createIPCamera(ipCamera).subscribe(() => {
      this.loadDevice();
    });
  }

  editIPCamera(ipCamera: IPCameraDTO): void {
    this.ipCameraService.updateIPCamera(ipCamera).subscribe(() => {
      this.loadDevice();
    });
  }

  removeIPCamera(ipCameraId: number): void {
    this.ipCameraService.deleteIPCamera(ipCameraId).subscribe(() => {
      this.loadDevice();
    });
  }
}
