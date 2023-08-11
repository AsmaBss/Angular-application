import { Parcelle } from './parcelle';
import { Prelevement } from './prelevement';

export class PlanSondage {
  id!: number;
  file!: string;
  type!: string;
  //geometry!: any;
  latitude!: number;
  longitude!: number;
  baseRef!: number;
  parcelle!: Parcelle;
  prelevement!: Prelevement;
}
