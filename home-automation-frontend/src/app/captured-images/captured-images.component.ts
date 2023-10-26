import { Component, OnInit } from '@angular/core';
import { CapturedImagesService } from '../captured-images.service';

@Component({
  selector: 'app-captured-images',
  templateUrl: './captured-images.component.html',
  styleUrls: ['./captured-images.component.scss']
})
export class CapturedImagesComponent implements OnInit {

  images: any[] = [];
  totalSize: number = 0;

  constructor(private imagesService: CapturedImagesService) { }

  ngOnInit(): void {
    this.imagesService.getCapturedImages().subscribe(data => {
      this.images = data.images;
      this.totalSize = data.totalSize;
    });
  }

  fetchImageLink(filename: string): string {
    return this.imagesService.fetchImage(filename);
  }
}
