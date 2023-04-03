import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations/locations.component';
import { DevicesComponent } from './devices/devices.component';
import { SensorsComponent } from './sensors/sensors.component';
import { ActuatorsComponent } from './actuators/actuators.component';
import { IPCamerasComponent } from './ip-cameras/ip-cameras.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { IPCameraEditComponent } from './ip-camera-edit/ip-camera-edit.component';
import { MqttMonitorComponent } from './mqtt-monitor/mqtt-monitor.component';

const routes: Routes = [
  { path: 'locations', component: LocationsComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: 'actuators', component: ActuatorsComponent },
  { path: 'ip-cameras', component: IPCamerasComponent },
  { path: 'ip-cameras/:id/edit', component: IPCameraEditComponent },
  { path: 'locations/:id', component: LocationDetailComponent },
  { path: 'devices/:id', component: DeviceDetailComponent },
  { path: 'mqtt-monitor', component: MqttMonitorComponent },
  { path: '', redirectTo: '/locations', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
