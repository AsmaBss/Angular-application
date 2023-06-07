import { Prelevement } from './prelevement';

export class Passe {
  id!: number;
  munitionReference!: string;
  gradientMag!: number;
  profondeurSonde!: number;
  profondeurSecurisee!: number;
  coteSecurisee!: number;
  prelevement!: Prelevement;
}
