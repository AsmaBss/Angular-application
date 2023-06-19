import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ImagesObservations } from 'src/app/models/images-observations';
import { Observation } from 'src/app/models/observation';
import { ObservationImagesService } from 'src/app/services/observation-images.service';

@Component({
  selector: 'app-observation-images',
  templateUrl: './observation-images.component.html',
  styleUrls: ['./observation-images.component.css'],
})
export class ObservationImagesComponent implements OnInit, OnChanges {
  @Input() id!: number;

  images: ImagesObservations[] = [];

  constructor(private imageService: ObservationImagesService) {}
  ngOnInit(): void {
    this.getAllImages(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && !changes['id'].firstChange) {
      this.getAllImages(this.id);
    }
  }

  getAllImages(id: number) {
    this.imageService.getByObservation(id).subscribe((data) => {
      this.images = data;
      console.log('data => ', data);
      console.log('images => ', this.images);
    });
  }
}
