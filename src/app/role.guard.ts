import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthRole } from './app-data.models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const requiredRole = (route.data['role'] as AuthRole | undefined) ?? 'user';
    if (this.auth.hasRole(requiredRole)) {
      return true;
    }

    if (!this.auth.isAuthenticated()) {
      return this.router.createUrlTree(['/login'], {
        queryParams: { redirectTo: `/${route.routeConfig?.path ?? 'admin'}` },
      });
    }

    return this.router.createUrlTree(['/recipes', 'pap-wors']);
  }
}
