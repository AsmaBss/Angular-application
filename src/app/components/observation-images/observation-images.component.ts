import { Component, Input, OnInit } from '@angular/core';
import { ImagesObservations } from 'src/app/models/images-observations';
import { Observation } from 'src/app/models/observation';
import { ObservationImagesService } from 'src/app/services/observation-images.service';

@Component({
  selector: 'app-observation-images',
  templateUrl: './observation-images.component.html',
  styleUrls: ['./observation-images.component.css'],
})
export class ObservationImagesComponent implements OnInit {
  @Input() observation!: Observation;

  images: ImagesObservations[] = [];

  constructor(private imagesService: ObservationImagesService) {}

  ngOnInit(): void {
    this.getAll(this.observation.id);
  }

  getAll(id: number) {
    this.imagesService.getByObservation(id).subscribe((data) => {
      this.images = data;
    });
  }
}
