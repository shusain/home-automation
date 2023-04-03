import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { DeviceService } from '../services/device.service';
import { LocationDTO } from 'shared-models/dtos/LocationDTO';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {
  locationId!: number;
  location?: LocationDTO;
  newDeviceForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private deviceService: DeviceService,
    private fb: FormBuilder
  ) {
    this.newDeviceForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.locationId = Number(params['id']);
      this.loadLocation();
    });
  }

  loadLocation(): void {
    this.locationService.getLocation(this.locationId).subscribe(location => {
      this.location = location;
    });
  }

  onSubmit(): void {
    if (this.newDeviceForm.valid) {
      const deviceName = this.newDeviceForm.get('name')?.value;
      this.deviceService.addDevice(this.locationId, deviceName).subscribe(() => {
        this.loadLocation();
        this.newDeviceForm.reset();
      });
    }
  }
}
