import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/models/images';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  @Input() id!: number;

  images!: Image[];

  constructor(private i: ImageService) {}

  ngOnInit(): void {
    this.getAll(this.id);
  }

  getAll(id: number) {
    this.i.getAll(id).subscribe((data) => {
      this.images = data;
    });
  }
}
