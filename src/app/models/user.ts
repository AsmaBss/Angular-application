import { Role } from './role';

export class User {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;
  roles!: Role[];
}
