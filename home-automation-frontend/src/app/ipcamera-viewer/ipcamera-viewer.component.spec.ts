import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpcameraViewerComponent } from './ipcamera-viewer.component';

describe('IpcameraViewerComponent', () => {
  let component: IpcameraViewerComponent;
  let fixture: ComponentFixture<IpcameraViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpcameraViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpcameraViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
