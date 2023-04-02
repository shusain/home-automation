import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations/locations.component';
import { DevicesComponent } from './devices/devices.component';
import { SensorsComponent } from './sensors/sensors.component';
import { ActuatorsComponent } from './actuators/actuators.component';
import { IpCamerasComponent } from './ip-cameras/ip-cameras.component';

const routes: Routes = [
  { path: 'locations', component: LocationsComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: 'actuators', component: ActuatorsComponent },
  { path: 'ip-cameras', component: IpCamerasComponent },
  { path: '', redirectTo: '/locations', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
