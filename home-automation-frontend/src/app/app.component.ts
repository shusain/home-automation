import { Component, OnInit } from '@angular/core';
import { LocationService, Location } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  locations: Location[] = [];

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
