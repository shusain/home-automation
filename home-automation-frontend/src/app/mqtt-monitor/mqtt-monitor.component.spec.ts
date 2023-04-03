import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttMonitorComponent } from './mqtt-monitor.component';

describe('MqttMonitorComponent', () => {
  let component: MqttMonitorComponent;
  let fixture: ComponentFixture<MqttMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqttMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MqttMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
