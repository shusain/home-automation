import { Component, OnInit } from '@angular/core';
import { LocationDTO } from 'shared-models/dtos/LocationDTO';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  locations: LocationDTO[] = [];

  constructor(private locationsService: LocationService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  private loadLocations(): void {
    this.locationsService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });
  }
}
