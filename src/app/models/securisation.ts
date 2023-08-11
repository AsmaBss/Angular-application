import { Parcelle } from './parcelle';
import { Prelevement } from './prelevement';

export class Securisation {
  id!: number;
  nom!: string;
  munitionReference!: string;
  cotePlateforme!: number;
  profondeurASecuriser!: number;
  coteASecuriser!: number;
  parcelle!: Parcelle;
}
