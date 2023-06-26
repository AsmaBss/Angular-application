import { Component, OnInit } from '@angular/core';
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
  users: User[] = [];

  displayUpdate: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
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
        ).then(() => window.location.reload());
      }
    });
  }

  modalUpdate(id: number) {
    this.displayUpdate = true;
  }
}
