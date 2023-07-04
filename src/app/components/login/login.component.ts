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

  onPasswordChange() {
    console.log('onPasswordChange');
    this.errorMessage = '';
  }

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
          console.log(error.error.message);
          this.errorMessage = error.error.message;
        } else if (error.status === 403) {
          console.log(error.error.message);
          this.errorMessage = error.error.message;
        } else {
          console.log(error.error.message);
          this.errorMessage = error.error.message;
        }
      }
    );
  }
}
