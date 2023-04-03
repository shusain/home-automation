import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IPCameraDTO } from 'shared-models/dtos/IPCameraDTO';
import { IpCameraService } from '../services/ip-camera.service';

@Component({
  selector: 'app-ipcamera-viewer',
  templateUrl: './ipcamera-viewer.component.html',
  styleUrls: ['./ipcamera-viewer.component.scss']
})
export class IPCameraViewerComponent implements OnInit, OnDestroy {
  @Input() ipCamera!: IPCameraDTO;
  streamUrl!: string;

  constructor(private ipCameraService: IpCameraService) {}

  ngOnInit(): void {
    // TODO: Need to fix the stream start so re-uses the same
    // stream for a given camera, for now using http jpeg
    // stream from ESP32 cams and img src to display 

    // this.ipCameraService.startStream(this.ipCamera.id).subscribe((data) => {
    //   this.streamUrl = data.streamUrl;
    // });
  }

  ngOnDestroy(): void {
    // this.ipCameraService.stopStream(this.ipCamera.id).subscribe();
  }
}
