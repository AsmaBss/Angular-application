import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Parcelle } from 'src/app/models/parcelle';
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
  parcelles: Parcelle[] = [];
  message!: string;
  currentUser!: User;

  constructor(
    private parcelleService: ParcelleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadParcelles();
    this.getUserDetails();
  }

  loadParcelles() {
    this.parcelleService.getAll().subscribe((data) => {
      this.parcelles = data;
    });
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
  }
}
