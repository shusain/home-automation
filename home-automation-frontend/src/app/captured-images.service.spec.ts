import { TestBed } from '@angular/core/testing';

import { CapturedImagesService } from './captured-images.service';

describe('CapturedImagesService', () => {
  let service: CapturedImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapturedImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
