import { PlanSondage } from './plan-sondage';
import { Securisation } from './securisation';

export class Parcelle {
  id!: number;
  nom!: string;
  fichierShp!: string;
  fichierShx!: string;
  fichierDbf!: string;
  fichierPrj!: string;
  type!: string;
  geometry!: any;
  planSondage!: PlanSondage[];
  securisation!: Securisation;
  //observation!: Observations[];
}
