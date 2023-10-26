import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';
import { DevicesComponent } from './devices/devices.component';
import { SensorsComponent } from './sensors/sensors.component';
import { ActuatorsComponent } from './actuators/actuators.component';
import { IPCamerasComponent } from './ip-cameras/ip-cameras.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { MatCardModule } from '@angular/material/card';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { IPCameraViewerComponent } from './ipcamera-viewer/ipcamera-viewer.component';
import { IPCameraEditComponent } from './ip-camera-edit/ip-camera-edit.component';
import { MqttMonitorComponent } from './mqtt-monitor/mqtt-monitor.component';
import { CapturedImagesComponent } from './captured-images/captured-images.component'

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    DevicesComponent,
    SensorsComponent,
    ActuatorsComponent,
    IPCamerasComponent,
    LocationDetailComponent,
    DeviceDetailComponent,
    IPCameraViewerComponent,
    IPCameraEditComponent,
    MqttMonitorComponent,
    CapturedImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
