import { Geometry } from '@turf/turf';

export class Shapefile {
  id!: number;
  file!: string;
  type!: string;
  geometry!: Geometry;
}
