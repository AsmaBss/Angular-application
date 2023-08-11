import { ImagesPrelevement } from './images-prelevement';
import { Passe } from './passe';
import { PlanSondage } from './plan-sondage';
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
  images!: ImagesPrelevement[];
  passes!: Passe[];
}
