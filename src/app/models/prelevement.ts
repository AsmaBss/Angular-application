import { PlanSondage } from './plan-sondage';
import { Securisation } from './securisation';
import { Statut } from './statut';

export class Prelevement {
  id!: number;
  numero!: number;
  munitionReference!: string;
  cotePlateforme!: number;
  profondeurASecuriser!: number;
  coteASecuriser!: number;
  remarques!: string;
  statut!: Statut;
  planSondage!: PlanSondage;
  securisation!: Securisation;
  images!: any[];
  passes!: any[];
}
