import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(f: any) {
    this.authService.login(f).subscribe(
      (data) => {
        this.authService.setUser(data.user);
        this.authService.setToken(data.jwtToken);
        const role = data.user.roles[0].type;
        if (
          role === 'ADMIN' ||
          role === 'SUPERVISOR' ||
          role === 'SIMPLE_USER'
        ) {
          this.router.navigate(['/Accueil']);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = error.error.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = error.error.message;
        }
      }
    );
  }
}
