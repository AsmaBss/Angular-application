import { Observation } from './observation';
import { PlanSondage } from './plan-sondage';
import { Securisation } from './securisation';
import { User } from './user';

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
  observations!: Observation[];
  users!: User[];
}
