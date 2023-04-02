import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService, Location } from '../services/location.service';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  addDeviceForm: FormGroup;
  locations: Location[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private deviceService: DeviceService
  ) {
    this.addDeviceForm = this.formBuilder.group({
      location: ['', Validators.required],
      deviceName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLocations();
  }

  private loadLocations(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });
  }

  onSubmit(): void {
    if (this.addDeviceForm.invalid) {
      return;
    }

    const { location, deviceName } = this.addDeviceForm.value;

    this.deviceService.addDevice(location.id, deviceName).subscribe(() => {
      this.addDeviceForm.reset();
      // Optional: Display a success message or refresh the devices list if needed
    });
  }
}
