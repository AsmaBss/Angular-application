import { Parcelle } from './parcelle';
import { Prelevement } from './prelevement';

export class PlanSondage {
  id!: number;
  file!: string;
  type!: string;
  geometry!: any;
  baseRef!: number;
  parcelle!: Parcelle;
  prelevement!: Prelevement;
}
