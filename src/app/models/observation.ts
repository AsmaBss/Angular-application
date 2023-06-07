import { ImagesObservations } from './images-observations';

export class Observation {
  id!: number;
  num!: string;
  description!: string;
  latitude!: string;
  longitude!: string;
  images!: ImagesObservations[];
}
