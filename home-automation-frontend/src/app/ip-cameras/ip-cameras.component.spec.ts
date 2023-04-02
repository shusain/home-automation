import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpCamerasComponent } from './ip-cameras.component';

describe('IpCamerasComponent', () => {
  let component: IpCamerasComponent;
  let fixture: ComponentFixture<IpCamerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpCamerasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpCamerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
