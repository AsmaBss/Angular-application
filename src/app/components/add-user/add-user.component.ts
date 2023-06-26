import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Parcelle } from 'src/app/models/parcelle';
import { TypeRole } from 'src/app/models/type-role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ParcelleService } from 'src/app/services/parcelle.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  typeRole: any = TypeRole;
  keys: string[] = [];
  selected!: TypeRole;
  hide = true;
  parcelles: Parcelle[] = [];
  selectedParcelles: Parcelle[] = [];

  constructor(
    private authService: AuthService,
    private parcelleService: ParcelleService
  ) {
    this.keys = Object.keys(this.typeRole);
  }

  ngOnInit(): void {}

  showDiv() {
    if (this.selected.toString() == 'SIMPLE_USER') {
      this.loadParcelles();
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  loadParcelles() {
    this.parcelleService.getAll().subscribe((data) => {
      this.parcelles = data;
    });
  }

  selectedParcelle(p: Parcelle): void {
    const index = this.selectedParcelles.indexOf(p);
    if (index === -1) {
      this.selectedParcelles.push(p);
    } else {
      this.selectedParcelles.splice(index, 1);
    }
  }

  addUser(f: User) {
    var id!: number;

    if (this.selected.toString() == 'ADMIN') {
      id = 1;
      this.selectedParcelles = [];
      this.authService.addUser(f, this.selectedParcelles, id).subscribe(() => {
        window.location.reload();
      });
    } else if (this.selected.toString() == 'SUPERVISOR') {
      id = 2;
      this.selectedParcelles = [];
      this.authService.addUser(f, this.selectedParcelles, id).subscribe(() => {
        window.location.reload();
      });
    } else if (this.selected.toString() == 'SIMPLE_USER') {
      id = 3;
      this.selectedParcelles = this.selectedParcelles.map((parcelle) => {
        return {
          ...parcelle,
          geometry: null,
        };
      });
      this.authService.addUser(f, this.selectedParcelles, id).subscribe(() => {
        window.location.reload();
      });
    }
  }
}