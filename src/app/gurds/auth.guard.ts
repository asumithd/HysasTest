import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authService.getUserRole();
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated && userRole === expectedRole) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
