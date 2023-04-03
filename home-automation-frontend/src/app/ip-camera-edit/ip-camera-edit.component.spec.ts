import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpCameraEditComponent } from './ip-camera-edit.component';

describe('IpCameraEditComponent', () => {
  let component: IpCameraEditComponent;
  let fixture: ComponentFixture<IpCameraEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpCameraEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpCameraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
