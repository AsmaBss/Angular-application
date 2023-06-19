import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.authService.getToken();
    if (token) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
    /*if (this.authService.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;
      if (role) {
        const match = this.authService.roleMatch(role);
        if (match) {
          return true;
        }
      }
    }
    this.router.navigate(['/']);
    return false;*/
  }
}
