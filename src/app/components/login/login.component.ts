import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(f: any) {
    this.authService.login(f).subscribe(
      (data) => {
        this.authService.setRoles(data.user.roles);
        this.authService.setToken(data.jwtToken);
        const role = data.user.roles[0].type;
        if (role === 'ADMIN' || role === 'USER') {
          this.router.navigate(['/Accueil']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
