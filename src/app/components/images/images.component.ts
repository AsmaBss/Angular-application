import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Image } from 'src/app/models/images';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit, OnChanges {
  @Input() id!: number;

  images: Image[] = [];

  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.getAllImages(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && !changes['id'].firstChange) {
      this.getAllImages(this.id);
    }
  }

  getAllImages(id: number) {
    this.imageService.getAll(id).subscribe((data) => {
      this.images = data;
    });
  }
}
