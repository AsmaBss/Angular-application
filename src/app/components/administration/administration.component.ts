import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeRole } from 'src/app/models/type-role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent implements OnInit {
  users: User[] = [];
  displayUpdate: boolean = false;

  role!: TypeRole;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.loadUsers();
  }

  getUserDetails() {
    var u = this.authService.getUser();
    this.role = u.roles[0].type;
  }

  userAdded(event: boolean) {
    if (event === true) {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getAll().subscribe((data) => {
      data.shift();
      this.users = data;
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Vous êtes sûr?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe();
        Swal.fire(
          'Supprimé!',
          'Cette utilisateur a été supprimé.',
          'success'
        ).then(() => {
          const currentUrl = this.router.url;
          this.router
            .navigateByUrl('/Accueil', {
              skipLocationChange: false,
              onSameUrlNavigation: 'reload',
            })
            .then(() => {
              this.router.navigate([currentUrl]);
              this.loadUsers();
            });
        });
      }
    });
  }

  modalUpdate(id: number) {
    this.displayUpdate = true;
  }
}
