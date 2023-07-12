import {
  AfterContentInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Parcelle } from 'src/app/models/parcelle';
import { TypeRole } from 'src/app/models/type-role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ParcelleService } from 'src/app/services/parcelle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() parcelle = new EventEmitter<Parcelle>();
  @Output() type = new EventEmitter<string>();

  headerData!: string;
  parcelles: Parcelle[] = [];
  message!: string;
  currentUser!: User;
  role!: TypeRole;

  displayListParcelles: boolean = false;
  displayListUsers: boolean = false;

  listParcelles: boolean = false;
  addParcelle: boolean = true;

  veriff: boolean = false;
  dropdown: boolean = true;

  constructor(
    private parcelleService: ParcelleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.loadParcelles();
  }

  loadParcelles() {
    if (
      this.role.toString() == 'ADMIN' ||
      this.role.toString() == 'SUPERVISOR'
    ) {
      this.parcelleService.getAll().subscribe((data) => {
        this.parcelles = data;
      });
    } else {
      this.parcelleService.getByUser(this.currentUser.id).subscribe((data) => {
        this.parcelles = data;
      });
    }
  }

  selectedParcelle(parcelle: Parcelle) {
    this.parcelle.emit(parcelle);
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['/']);
  }

  getUserDetails() {
    this.currentUser = this.authService.getUser();
    this.role = this.currentUser.roles[0].type;
  }

  modalListParcelles() {
    this.displayListParcelles = true;
  }

  modalListUsers() {
    this.displayListUsers = true;
  }

  visualisationButton() {
    this.listParcelles = false;
    this.dropdown = true;
    this.addParcelle = true;
    this.type.emit('Visualisation');
  }
  administrationButton() {
    this.addParcelle = false;
    this.dropdown = false;
    this.listParcelles = true;
    this.type.emit('Administration');
  }

  verif(event: boolean) {
    if ((this.veriff = true)) {
      this.loadParcelles();
    }
  }
}
