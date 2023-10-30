import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CapturedImagesService } from '../captured-images.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-captured-images',
  templateUrl: './captured-images.component.html',
  styleUrls: ['./captured-images.component.scss']
})
export class CapturedImagesComponent implements OnInit {
  images:Array<{link:string, name: string}> = [];  // Assume this array is populated with your image URLs
  imageControl = new FormControl();
  captureServerURL = `http://${environment.serverDomain}:3001`

  public constructor(private capturedImagesService: CapturedImagesService) {

  }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.capturedImagesService.getCapturedImages()
      .subscribe(imageResponse => {
        this.images = imageResponse.images;
        if (this.images.length > 0) {
          this.imageControl.setValue(this.images[0]);
        }
      });
  }

  prevImage(): void {
    // Navigate to the previous image in the list
    const index = this.images.indexOf(this.imageControl.value);
    if (index > 0) {
      this.imageControl.setValue(this.images[index - 1]);
    }
  }

  nextImage(): void {
    // Navigate to the next image in the list
    const index = this.images.indexOf(this.imageControl.value);
    if (index < this.images.length - 1) {
      this.imageControl.setValue(this.images[index + 1]);
    }
  }
}
