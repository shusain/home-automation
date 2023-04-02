import { TestBed } from '@angular/core/testing';

import { IpCameraService } from './ip-camera.service';

describe('IpCameraService', () => {
  let service: IpCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
