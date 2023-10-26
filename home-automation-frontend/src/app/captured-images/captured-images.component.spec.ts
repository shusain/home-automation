import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturedImagesComponent } from './captured-images.component';

describe('CapturedImagesComponent', () => {
  let component: CapturedImagesComponent;
  let fixture: ComponentFixture<CapturedImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturedImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
