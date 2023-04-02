import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location, LocationService } from '../services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  locations: Location[] = [];
  locationForm: FormGroup;
  locationUpdateForms: Map<number, FormGroup> = new Map();

  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder
  ) {
    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations;
      this.locations.forEach((location) => {
        this.locationUpdateForms.set(
          location.id,
          this.formBuilder.group({
            name: [location.name, Validators.required],
          })
        );
      });
    });
  }

  createLocation(): void {
    if (this.locationForm.valid) {
      this.locationService
        .createLocation(this.locationForm.value)
        .subscribe((location) => {
          this.loadLocations();
          this.locationForm.reset();
        });
    }
  }

  updateLocation(id: number): void {
    if (this.locationUpdateForms.get(id)?.valid) {
      this.locationService
        .updateLocation(id, this.locationUpdateForms.get(id)?.value)
        .subscribe(() => {
          this.loadLocations();
        });
    }
  }

  deleteLocation(id: number): void {
    this.locationService.deleteLocation(id).subscribe(() => {
      this.loadLocations();
    });
  }
}
