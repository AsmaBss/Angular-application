import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { TypeRole } from 'src/app/models/type-role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];

  displayUpdate: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe((data) => {
      data.shift();
      //this.users = data;
      this.users = data.map((item) => ({
        id: item.id,
        firstname: item.firstname,
        lastname: item.lastname,
        email: item.email,
        role: item.roles[0].type,
      }));
    });
  }

  getRoleDisplayName(role: TypeRole): string {
    switch (role) {
      case TypeRole.ADMIN:
        return 'Admin';
      case TypeRole.SUPERVISOR:
        return 'Superviseur';
      case TypeRole.SIMPLE_USER:
        return 'Utilisateur simple';
      default:
        return '';
    }
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
            });
        });
      }
    });
  }

  modalUpdate(id: number) {
    this.displayUpdate = true;
  }
}
