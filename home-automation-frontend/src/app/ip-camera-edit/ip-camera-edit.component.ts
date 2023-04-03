import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpCameraService } from '../services/ip-camera.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPCameraDTO } from 'shared-models/dtos/IPCameraDTO';

@Component({
  selector: 'app-ip-camera-edit',
  templateUrl: './ip-camera-edit.component.html',
  styleUrls: ['./ip-camera-edit.component.scss']
})
export class IPCameraEditComponent implements OnInit {
  ipCameraId!: number;
  ipCamera!: IPCameraDTO;
  ipCameraForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ipCameraService: IpCameraService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.ipCameraId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadIPCamera();
    this.createForm();
  }

  loadIPCamera(): void {
    this.ipCameraService.getIPCamera(this.ipCameraId).subscribe(ipCamera => {
      this.ipCamera = ipCamera;
      this.updateForm();
    });
  }

  createForm(): void {
    this.ipCameraForm = this.formBuilder.group({
      name: ['', Validators.required],
      rtspUrl: ['', Validators.required],
      deviceId: ['', Validators.required]
    });
  }

  updateForm(): void {
    this.ipCameraForm.patchValue({
      name: this.ipCamera.name,
      rtspUrl: this.ipCamera.rtspUrl,
      deviceId: this.ipCamera.device?.id
    });
  }

  onSubmit(): void {
    if (this.ipCameraForm.invalid) {
      return;
    }

    const updatedIPCamera: IPCameraDTO = {
      id: this.ipCamera.id,
      name: this.ipCameraForm.value.name,
      rtspUrl: this.ipCameraForm.value.rtspUrl,
      deviceId:this.ipCameraForm.value.deviceId
    };

    this.ipCameraService.updateIPCamera(updatedIPCamera).subscribe(() => {
      this.router.navigate(['/ip-cameras']);
    });
  }
}

