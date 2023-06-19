import { ImagesObservations } from './images-observations';

export class Observation {
  id!: number;
  nom!: string;
  description!: string;
  latitude!: string;
  longitude!: string;
  images!: ImagesObservations[];
}
